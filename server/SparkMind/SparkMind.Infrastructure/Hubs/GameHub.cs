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

        await lobbyService.AddPlayerToLobby(lobbyCode, playerName, Context.ConnectionId);
    }
    
    [Authorize]
    public async Task<string> CreateLobby()
    {
        if (Context.User == null) 
            throw new UnauthorizedAccessException("You need to be logged in to create a lobby!");
        
        var hostId = Context.User.GetUserId();
        var lobbyCode = await lobbyService.CreateNewLobby(hostId, Context.ConnectionId);

        await Groups.AddToGroupAsync(Context.ConnectionId, lobbyCode);
        return lobbyCode;
    }
}