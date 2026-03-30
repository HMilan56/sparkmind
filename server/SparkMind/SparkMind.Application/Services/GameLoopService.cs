using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using SparkMind.Application.Interfaces;
using SparkMind.Domain.Models;

namespace SparkMind.Application.Services;

public class GameLoopService(
    ILobbyService lobbyService
    ) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using PeriodicTimer timer = new(TimeSpan.FromSeconds(1));
        while (await timer.WaitForNextTickAsync(stoppingToken))
        {
            foreach (var lobby in await lobbyService.GetActiveLobbies())
            {
                if (lobby.StateMachine.AutoAdvanceTimestamp <= DateTimeOffset.UtcNow)
                {
                    lobby.StateMachine.Advance();
                }
            }
        }
    }
}