using SparkMind.Domain.Models;

namespace SparkMind.Application.Interfaces;

public record ConnectionData(string ConnectionId, string LobbyCode);

public interface IConnectionRepository
{
    void AddHost(string connectionId, int userId, string lobbyCode);
    void RemoveHost(string connectionId);
    void AddPlayer(string connectionId, string playerId, string lobbyCode);
    void RemovePlayer(string connectionId);
    public string? GetHostConnectionId(int userId);
    public string? GetPlayerConnectionId(string playerId);
}