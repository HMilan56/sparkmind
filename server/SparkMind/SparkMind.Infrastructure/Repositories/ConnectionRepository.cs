using System.Collections;
using System.Collections.Concurrent;
using SparkMind.Application.Interfaces;
using SparkMind.Domain.Interfaces;
using SparkMind.Domain.Models;

namespace SparkMind.Infrastructure.Repositories;

public class ConnectionRepository : IConnectionRepository
{
    private readonly ConcurrentDictionary<string, string> _playerToConn = new();
    private readonly ConcurrentDictionary<string, IPlayer> _connToPlayer = new();
    
    private readonly ConcurrentDictionary<int, string> _hostToConn = new();
    private readonly ConcurrentDictionary<string, Host> _connToHost = new();

    public void AddHost(string connectionId, Host host)
    {
        _hostToConn.TryAdd(host.UserId, connectionId);
        _connToHost.TryAdd(connectionId, host);
    }

    public void AddPlayer(string connectionId, IPlayer player)
    {
        _playerToConn.TryAdd(player.Id, connectionId);
        _connToPlayer.TryAdd(connectionId, player);
    }

    public void RemoveHost(string connectionId)
    {
        _connToHost.TryRemove(connectionId, out var host);
        _hostToConn.TryRemove(host.UserId, out var _);
    }

    public void RemovePlayer(string connectionId)
    {
        _connToPlayer.TryRemove(connectionId, out var player);
        if (player != null)
            _playerToConn.TryRemove(player.Id, out var _);
    }

    public string? GetConnectionIdByHost(int userId)
    {
        var result = _hostToConn.TryGetValue(userId, out var data);
        return result ? data : null;
    }

    public string? GetConnectionIdByPlayer(string playerId)
    {
        var result = _playerToConn.TryGetValue(playerId, out var data);
        return result ? data : null;
    }

    public Host? GetHostByConnectionId(string connectionId)
    {
        var result = _connToHost.TryGetValue(connectionId, out var data);
        return result ? data : null;
    }

    public IPlayer? GetPlayerByConnectionId(string connectionId)
    {
        var result = _connToPlayer.TryGetValue(connectionId, out var data);
        return result ? data : null;
    }
}