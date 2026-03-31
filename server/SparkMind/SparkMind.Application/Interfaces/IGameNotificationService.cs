namespace SparkMind.Application.Interfaces;

public interface IGameNotificationService
{
    Task NotifyHostPlayersUpdated(string groupName, List<string> players);
    Task NotifyStateUpdated(string groupName, object state);
    Task NotifyAnswerSubmitted(string groupName, string answer);
}