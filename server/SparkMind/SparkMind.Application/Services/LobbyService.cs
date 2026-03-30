using Microsoft.AspNetCore.Identity;
using SparkMind.Application.Interfaces;
using SparkMind.Domain.Interfaces;
using SparkMind.Domain.Models;

namespace SparkMind.Application.Services;

public class LobbyService(
    IGameNotificationService notifier,
    ILobbyRepository lobbyRepository,
    IConnectionRepository connectionRepository,
    UserManager<User> userManager) : ILobbyService
{
    public async Task AddPlayerToLobby(string code, string name, string connectionId)
    {
        var lobby = lobbyRepository.GetByCode(code);
        var player = lobby?.TryAddPlayer(name);
        
        if (player != null)
        {
            connectionRepository.AddPlayer(connectionId, player.Id, code);
            await notifier.NotifyHostPlayerJoined(code, name);
        }
        
    }
    
    public async Task<string> CreateOrGetLobby(int userId, string connectionId)
    {
        var user = await userManager.FindByIdAsync(userId.ToString());
        if (user == null)
            throw new UnauthorizedAccessException("User not found");
        
        var lobby = lobbyRepository.GetByHost(user.Id);
        if (lobby != null)
            return lobby.LobbyCode;
        
        lobby = new Lobby(userId);
        lobbyRepository.Save(lobby);
        connectionRepository.AddHost(connectionId, userId, lobby.LobbyCode);
        
        Console.WriteLine($"Created new lobby hosted by {user.UserName}, connect with code: {lobby.LobbyCode}");
    
        return lobby.LobbyCode;
    }
}