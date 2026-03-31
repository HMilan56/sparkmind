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
        _lobbiesByCode[lobby.Code] = lobby;
        _lobbiesByHost[lobby.Host.UserId] = lobby; 
    }

    public Lobby? GetByCode(string code) 
    {
        return _lobbiesByCode.GetValueOrDefault(code);
    }

    public Lobby? GetByHost(int userId)
    {
        return _lobbiesByHost.GetValueOrDefault(userId);
    }

    public IEnumerable<Lobby> GetActiveLobbies()
    {
        return _lobbiesByHost.Values.Where(lobby =>
        {
            var state = lobby.StateMachine.State;
            return state != LobbyState.WaitingForStart && state != LobbyState.GameOver;
        });
    }

    public void Delete(Lobby lobby) 
    {
        _lobbiesByCode.TryRemove(lobby.Code, out _);
        _lobbiesByHost.TryRemove(lobby.Host.UserId, out _);
    }
}