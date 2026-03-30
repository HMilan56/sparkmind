using Microsoft.AspNetCore.SignalR;
using SparkMind.Application.Interfaces;
using SparkMind.Infrastructure.Hubs;

namespace SparkMind.Infrastructure.RealTime;

public class SignalRNotificationService(IHubContext<GameHub> hubContext) : IGameNotificationService
{
    public async Task NotifyHostPlayerJoined(string groupName, string playerName)
    {
        await hubContext.Clients.Group(groupName).SendAsync("PlayerJoined", playerName);
    }

    public async Task NotifyHostPlayerLeft(string groupName, string playerName)
    {
        await hubContext.Clients.Group(groupName).SendAsync("PlayerLeft", playerName);
    }

    public async Task NotifyStateUpdated(string groupName, object state)
    {
        await hubContext.Clients.Group(groupName).SendAsync("StateUpdated", state);
    }

    public async Task NotifyAnswerSubmitted(string groupName, string answer)
    {
        await hubContext.Clients.Group(groupName).SendAsync("AnswerSubmitted", answer);
    }
}