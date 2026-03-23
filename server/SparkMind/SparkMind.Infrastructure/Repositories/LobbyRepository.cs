using System.Collections.Concurrent;
using SparkMind.Domain.Interfaces;
using SparkMind.Domain.Models;

namespace SparkMind.Infrastructure.Repositories;

public class LobbyRepository : ILobbyRepository
{
    private readonly ConcurrentDictionary<string, Lobby> _lobbies = new();

    public void Save(Lobby lobby) 
    {
        _lobbies[lobby.LobbyCode] = lobby;
    }

    public Lobby? GetByCode(string code) 
    {
        _lobbies.TryGetValue(code, out var lobby);
        return lobby;
    }

    public void Delete(string code) 
    {
        _lobbies.TryRemove(code, out _);
    }
}