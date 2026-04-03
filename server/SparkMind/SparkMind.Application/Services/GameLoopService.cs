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
        var gameStateService = scope.ServiceProvider.GetRequiredService<IGameStateService>();
        
        var now = DateTimeOffset.UtcNow;
        
        foreach (var lobby in lobbyRepository.GetActiveLobbies().ToList())
        {
            var sm = lobby.StateMachine;

            if (sm.AutoAdvanceTimestamp == null || now < sm.AutoAdvanceTimestamp)
                continue;

            sm.ClearAutoAdvance();
            await gameStateService.TransitionToNextState(lobby);
        }
    }
}