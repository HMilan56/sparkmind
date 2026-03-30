namespace SparkMind.Application.Interfaces;

public interface ILobbyService
{
    public Task JoinLobby(string code, string name, string connectionId);
    public Task<string> CreateOrGetLobby(int userId, string connectionId);
    public Task Disconnect(string connectionId);
}