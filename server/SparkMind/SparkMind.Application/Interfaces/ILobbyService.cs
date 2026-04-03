using SparkMind.Domain.Models;

namespace SparkMind.Application.Interfaces;

public interface ILobbyService
{
    public Task<Lobby> GetByCodeAsync(string code);
    public Task<Lobby> GetByHostAsync(int userId);
    public Task JoinLobby(string code, string name, string connectionId);
    public Task<string> CreateOrGetLobby(int userId, string connectionId, int quizId);
    public Task Disconnect(string connectionId);
}