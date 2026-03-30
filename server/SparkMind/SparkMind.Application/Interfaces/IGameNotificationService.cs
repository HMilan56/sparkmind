using SparkMind.Application.DTOs;

namespace SparkMind.Application.Interfaces;

public interface IGameNotificationService
{
    Task NotifyHostPlayerJoined(string lobbyCode, string playerName);
    Task NotifyHostPlayerLeft(string lobbyCode, string playerName);
}