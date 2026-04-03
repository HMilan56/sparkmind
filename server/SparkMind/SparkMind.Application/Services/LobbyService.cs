using Microsoft.AspNetCore.Identity;
using SparkMind.Application.DTOs.Game;
using SparkMind.Application.Interfaces;
using SparkMind.Domain.Interfaces;
using SparkMind.Domain.Models;

namespace SparkMind.Application.Services;

public class LobbyService(
    IGameNotificationService notifier,
    ILobbyRepository lobbyRepository,
    IQuizRepository quizRepository,
    IConnectionRepository connectionRepository
) : ILobbyService
{
    public Task<Lobby> GetByCodeAsync(string code)
    {
        var lobby = lobbyRepository.GetByCode(code);
        return lobby == null ? throw new ArgumentException($"Cannot find lobby with code: {code}") : Task.FromResult(lobby);
    }

    public Task<Lobby> GetByHostAsync(int userId)
    {
        var lobby = lobbyRepository.GetByHost(userId);
        return lobby == null ? throw new ArgumentException($"Cannot find lobby hosted by: {userId}") : Task.FromResult(lobby);
    }
    
    public async Task JoinLobby(string code, string name, string connectionId)
    {
        var lobby = lobbyRepository.GetByCode(code);
        if (lobby == null)
            throw new ArgumentException($"Cannot find lobby code: {code}");
        
        var player = lobby.AddOrGetPlayer(name);

        connectionRepository.AddPlayer(connectionId, player);
        player.IsOnline = true;
        await notifier.NotifyHostPlayersUpdated(code, lobby.OnlinePlayers);
    }

    public async Task<string> CreateOrGetLobby(int userId, string connectionId, int quizId)
    {
        var lobby = lobbyRepository.GetByHost(userId);
        if (lobby != null)
            return lobby.Code;

        var quiz = await quizRepository.GetByIdAsync(quizId);
        if (quiz == null)
            throw new ArgumentException("Quiz not found");

        lobby = new Lobby(userId, quiz);

        lobbyRepository.Save(lobby);
        connectionRepository.AddHost(connectionId, lobby.Host);

        Console.WriteLine($"Created new lobby hosted by {userId}, connect with code: {lobby.Code}");

        return lobby.Code;
    }

    public async Task Disconnect(string connectionId)
    {
        var player = connectionRepository.GetPlayerByConnectionId(connectionId);
        if (player != null)
        {
            player.IsOnline = false;
            var onlinePlayers = player.Lobby.Players.Where(p => p.IsOnline).Select(p => p.Name).ToList();
            await notifier.NotifyHostPlayersUpdated(player.Lobby.Code, onlinePlayers);
            connectionRepository.RemovePlayer(connectionId);
            return;
        }
        
        var host = connectionRepository.GetHostByConnectionId(connectionId);
        if (host != null)
        {
            var lobby = host.lobby;
            if (lobby != null) lobbyRepository.Delete(lobby);
            connectionRepository.RemoveHost(connectionId);
        }
    }
}