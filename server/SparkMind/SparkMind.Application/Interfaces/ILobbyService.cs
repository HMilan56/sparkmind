using SparkMind.Domain.Models;

namespace SparkMind.Application.Interfaces;

public interface ILobbyService
{
    public Task JoinLobby(string code, string name, string connectionId);
    public Task<string> CreateOrGetLobby(int userId, string connectionId, int quizId);
    public Task<IEnumerable<Lobby>> GetActiveLobbies();
    public Task RequestNextStep(int userId);
    public Task SubmitAnswer(string connectionId, string answer);
    public Task Disconnect(string connectionId);
}