using System.Collections.Concurrent;
using SparkMind.Domain.Interfaces;
using SparkMind.Domain.Models;

namespace SparkMind.Infrastructure.Repositories;

public class LobbyRepository : ILobbyRepository
{
    private readonly ConcurrentDictionary<string, Lobby> _lobbiesByCode = new();
    private readonly ConcurrentDictionary<int, Lobby> _lobbiesByHost = new();

    public void Save(Lobby lobby) 
    {
        _lobbiesByCode[lobby.LobbyCode] = lobby;
        _lobbiesByHost[lobby.Host.UserId] = lobby; 
    }

    public Lobby? GetByCode(string code) 
    {
        _lobbiesByCode.TryGetValue(code, out var lobby);
        return lobby;
    }

    public Lobby? GetByHost(int userId)
    {
        _lobbiesByHost.TryGetValue(userId, out var lobby);
        return lobby;
    }

    public void Delete(Lobby lobby) 
    {
        _lobbiesByCode.TryRemove(lobby.LobbyCode, out _);
        _lobbiesByHost.TryRemove(lobby.Host.UserId, out _);
    }
}