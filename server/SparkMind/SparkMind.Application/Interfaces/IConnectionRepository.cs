using SparkMind.Domain.Models;

namespace SparkMind.Application.Interfaces;

public record PlayerData(string Name, string LobbyCode);

public interface IConnectionRepository
{
    void AddHost(string connectionId, Host host);
    void RemoveHost(string connectionId);
    void AddPlayer(string connectionId, Player player);
    void RemovePlayer(string connectionId);
    public string? GetConnectionIdByHost(int userId);
    public string? GetConnectionIdByPlayer(string playerId);
    public Host? GetHostByConnectionId(string connectionId);
    public Player? GetPlayerByConnectionId(string connectionId);
}