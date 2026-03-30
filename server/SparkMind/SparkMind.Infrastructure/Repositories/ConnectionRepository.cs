using System.Collections;
using System.Collections.Concurrent;
using SparkMind.Application.Interfaces;
using SparkMind.Domain.Models;

namespace SparkMind.Infrastructure.Repositories;

public class ConnectionRepository : IConnectionRepository
{
    private readonly ConcurrentDictionary<string, string> _players = new();
    private readonly ConcurrentDictionary<int, string> _hosts = new();

    private void RemoveByValue<T1, T2>(T2 value, ConcurrentDictionary<T1, T2> dictionary)
        where T1 : notnull
    {
        var keysToRemove = dictionary
            .Where(pair => pair.Value != null && pair.Value.Equals(value))
            .Select(pair => pair.Key);
        
        foreach (var key in keysToRemove)
        {
            dictionary.TryRemove(key, out _);
        }
    }
    
    public void AddHost(string connectionId, int userId, string lobbyCode)
        => _hosts.TryAdd(userId, connectionId);

    public void AddPlayer(string connectionId, string playerId, string lobbyCode)
        => _players.TryAdd(playerId, connectionId);

    public void RemoveHost(string connectionId) => RemoveByValue(connectionId, _hosts);
    
    public void RemovePlayer(string connectionId) => RemoveByValue(connectionId, _players);

    public string? GetHostConnectionId(int userId)
    {
        var result = _hosts.TryGetValue(userId, out var data);
        return result ? data : null;
    }

    public string? GetPlayerConnectionId(string playerId)
    {
        var result = _players.TryGetValue(playerId, out var data);
        return result ? data : null;
    }
}