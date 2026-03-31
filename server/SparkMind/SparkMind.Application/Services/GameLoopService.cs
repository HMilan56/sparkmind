using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SparkMind.Application.Factories;
using SparkMind.Application.Interfaces;
using SparkMind.Domain.Interfaces;
using SparkMind.Domain.Models;

namespace SparkMind.Application.Services;

public class GameLoopService(IServiceScopeFactory scopeFactory) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using PeriodicTimer timer = new(TimeSpan.FromSeconds(1));
        while (await timer.WaitForNextTickAsync(stoppingToken))
        {
            await TickAsync();
        }
    }

    public async Task TickAsync()
    {
        using var scope = scopeFactory.CreateScope();

        var lobbyRepository = scope.ServiceProvider.GetRequiredService<ILobbyRepository>();
        var notifier = scope.ServiceProvider.GetRequiredService<IGameNotificationService>();

        foreach (var lobby in lobbyRepository.GetActiveLobbies())
        {
            var sm = lobby.StateMachine;

            if (DateTimeOffset.UtcNow < sm.AutoAdvanceTimestamp)
                continue;

            lobby.RequestNextStep();
            await BroadcastLobbyUpdate(lobby, notifier);
        }
    }

    private async Task BroadcastLobbyUpdate(Lobby lobby, IGameNotificationService notifier)
    {
        var payload = LobbyMessageFactory.CreatePayload(lobby);

        await notifier.NotifyStateUpdated(lobby.Code, new
        {
            State = lobby.StateMachine.State,
            Deadline = lobby.StateMachine.AutoAdvanceTimestamp,
            Payload = payload
        });
    }
}