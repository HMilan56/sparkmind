using SparkMind.Domain.Interfaces;
using SparkMind.Domain.Models;

namespace SparkMind.Application.Interfaces;

public interface IGameNotificationService
{
    Task NotifyHostPlayersUpdated(Lobby lobby);
    Task NotifyStateUpdated(Lobby lobby);
    Task NotifyPlayerStateUpdated(Lobby lobby, IPlayer player);
    Task NotifyAnswerSubmitted(IPlayer player, string nickName);
}