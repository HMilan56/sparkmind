using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using SparkMind.Application.Extensions;
using SparkMind.Application.Interfaces;

namespace SparkMind.Infrastructure.Hubs;

public class GameHub(ILobbyService lobbyService) : Hub
{
    public async Task JoinLobby(string lobbyCode, string playerName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, lobbyCode);
        await lobbyService.JoinLobby(lobbyCode, playerName, Context.ConnectionId);
    }
    
    [Authorize]
    public async Task<string> CreateOrGetLobby(int quizId)
    {
        if (Context.User == null) 
            throw new UnauthorizedAccessException("You need to be logged in to create a lobby!");
        
        var hostId = Context.User.GetUserId();
        var lobbyCode = await lobbyService.CreateOrGetLobby(hostId, Context.ConnectionId, quizId);

        await Groups.AddToGroupAsync(Context.ConnectionId, lobbyCode);
        return lobbyCode;
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        lobbyService.Disconnect(Context.ConnectionId);
        return base.OnDisconnectedAsync(exception);
    }
}