using SparkMind.Domain.Models;

namespace SparkMind.Application.Interfaces;

public interface IGameStateService
{
    public Task TransitionToNextState(Lobby lobby);
    public Task SubmitAnswer(Player player, string answer);
}