using Microsoft.Extensions.DependencyInjection;
using SparkMind.Application.Factories;
using SparkMind.Application.Interfaces;
using SparkMind.Domain.Interfaces;
using SparkMind.Domain.Models;

namespace SparkMind.Application.Services;

public class GameStateService(IGameNotificationService notifier) : IGameStateService
{
    public async Task TransitionToNextState(Lobby lobby)
    {
        lobby.RequestNextStep();
        await notifier.NotifyStateUpdated(lobby);
    }

    public async Task SubmitAnswer(IPlayer player, string answer)
    {
        var lobby = player.Lobby;
        lobby.SubmitAnswer(player, answer);
        
        await notifier.NotifyAnswerSubmitted(player, player.Name);
    }
}