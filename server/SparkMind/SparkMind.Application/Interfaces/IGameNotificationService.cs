namespace SparkMind.Application.Interfaces;

public interface IGameNotificationService
{
    Task NotifyHostPlayerJoined(string groupName, string playerName);
    Task NotifyHostPlayerLeft(string groupName, string playerName);
    Task NotifyStateUpdated(string groupName, object state);
    Task NotifyAnswerSubmitted(string groupName, string answer);
}