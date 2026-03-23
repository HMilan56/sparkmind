using Microsoft.AspNetCore.SignalR;
using SparkMind.Application.Interfaces;
using SparkMind.Infrastructure.Hubs;

namespace SparkMind.Infrastructure.RealTime;

public class SignalRNotificationService(IHubContext<GameHub> hubContext) : IGameNotificationService
{
    public async Task NotifyHostPlayerJoined(string lobbyCode, string playerName)
    {
        await hubContext.Clients.Group(lobbyCode).SendAsync("PlayerJoined", playerName);
    }
}