namespace SparkMind.Application.Interfaces;

public interface ILobbyService
{
    public Task AddPlayerToLobby(string code, string name, string connectionId);
    public Task<string> CreateOrGetLobby(int userId, string connectionId);
}