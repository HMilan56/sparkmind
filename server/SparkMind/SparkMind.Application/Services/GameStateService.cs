using Microsoft.Extensions.DependencyInjection;
using SparkMind.Application.Factories;
using SparkMind.Application.Interfaces;
using SparkMind.Domain.Models;

namespace SparkMind.Application.Services;

public class GameStateService(IGameNotificationService notifier) : IGameStateService
{
    public async Task TransitionToNextState(Lobby lobby)
    {
        lobby.RequestNextStep();
        
        var payload = LobbyMessageFactory.CreatePayload(lobby);
        
        await notifier.NotifyStateUpdated(lobby.Code, new
        {
            State = lobby.StateMachine.State.ToString(),
            Deadline = lobby.StateMachine.AutoAdvanceTimestamp?.ToUnixTimeMilliseconds(),
            Payload = payload
        });
    }

    public async Task SubmitAnswer(Player player, string answer)
    {
        var lobby = player.Lobby;
        lobby.SubmitAnswer(player, answer);
        
        await notifier.NotifyAnswerSubmitted(player.Lobby.Code, player.Name);
    }
}