using Microsoft.AspNetCore.SignalR;
using SparkMind.Application.Factories;
using SparkMind.Application.Interfaces;
using SparkMind.Domain.Interfaces;
using SparkMind.Domain.Models;
using SparkMind.Infrastructure.Hubs;

namespace SparkMind.Infrastructure.RealTime;

public class SignalRNotificationService(
    IHubContext<GameHub> hubContext,
    IConnectionRepository connectionRepository
) : IGameNotificationService
{
    private async Task SendGroupAsync(string groupName, string message, object payload)
    {
        await hubContext.Clients.Group(groupName).SendAsync(message, payload);
    }

    private async Task SendSingleAsync(string connectionId, string message, object payload)
    {
        await hubContext.Clients.Client(connectionId).SendAsync(message, payload);
    }

    public async Task NotifyHostPlayersUpdated(Lobby lobby)
    {
        var conId = connectionRepository.GetConnectionIdByHost(lobby.Host.UserId);
        if (conId == null)
            throw new Exception("No connection id found for host: " + lobby.Host.UserId);
        
        await SendSingleAsync(conId, "PlayerListUpdate", lobby.Players.Select(p => p.Name));
    }

    public async Task NotifyStateUpdated(Lobby lobby)
    {
        var hostConId = connectionRepository.GetConnectionIdByHost(lobby.Host.UserId);
        if (hostConId == null)
            throw new Exception("No connection id found for host: " + lobby.Host.UserId);
        
        var hostPayload = LobbyMessageFactory.CreatePayloadForHost(lobby);
        var state = lobby.StateMachine.State.ToString();
        var deadline = lobby.StateMachine.AutoAdvanceTimestamp?.ToUnixTimeMilliseconds();
        var serverTime = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

        await SendSingleAsync(hostConId, "HostUpdate", new
        {
            Type = state,
            Deadline = deadline,
            Payload = hostPayload,
            ServerTime = serverTime
        });

        var playerPayload = LobbyMessageFactory.CreatePayloadForPlayers(lobby);
        await SendGroupAsync(lobby.Code, "PlayerUpdate", new
        {
            Type = state,
            Deadline = deadline,
            Payload = playerPayload,
            ServerTime = serverTime
        });
    }

    public async Task NotifyAnswerSubmitted(IPlayer player, string nickName)
    {
        var lobby = player.Lobby;
        var hostConId = connectionRepository.GetConnectionIdByHost(lobby.Host.UserId);
        if (hostConId == null)
            return;
        await SendSingleAsync(hostConId, "AnswerSubmitted", nickName);
    }
}