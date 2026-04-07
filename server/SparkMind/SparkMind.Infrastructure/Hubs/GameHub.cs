using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using SparkMind.Application.Extensions;
using SparkMind.Application.Interfaces;

namespace SparkMind.Infrastructure.Hubs;

public class GameHub(
    ILobbyService lobbyService,
    IConnectionRepository connectionRepository,
    IGameStateService gameStateService
) : Hub
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

    [Authorize]
    public async Task RequestNextStep()
    {
        if (Context.User == null)
            throw new UnauthorizedAccessException("You need to be logged in to control your lobby!");
            
        var hostId = Context.User.GetUserId();
        var lobby = await lobbyService.GetByHostAsync(hostId);
        await gameStateService.TransitionToNextState(lobby);
    }

    public async Task SubmitAnswer(int answerId)
    {
        var player = connectionRepository.GetPlayerByConnectionId(Context.ConnectionId);
        if  (player == null)
            throw new Exception("Cannot find matching player for this connection");

        var lobby = player.Lobby;
        var answer = lobby.CurrentQuestion.Answers[answerId-1];
        await gameStateService.SubmitAnswer(player, answer.Text);
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        await lobbyService.Disconnect(Context.ConnectionId);
        await base.OnDisconnectedAsync(exception);
    }
}