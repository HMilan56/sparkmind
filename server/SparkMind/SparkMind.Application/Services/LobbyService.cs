using Microsoft.AspNetCore.Identity;
using SparkMind.Application.Interfaces;
using SparkMind.Domain.Interfaces;
using SparkMind.Domain.Models;

namespace SparkMind.Application.Services;

public class LobbyService(IGameNotificationService notifier, ILobbyRepository lobbyRepository, UserManager<User> userManager) : ILobbyService
{
    public async Task AddPlayerToLobby(string code, string name, string connectionId)
    {
        var lobby = lobbyRepository.GetByCode(code);
        if (lobby == null)
            return;
            
        var player = new Player { Name = name, ConnectionId = connectionId };

        if (lobby.TryAddPlayer(player))
            await notifier.NotifyHostPlayerJoined(code, name);
    }
    
    public async Task<string> CreateNewLobby(int userId, string connectionId)
    {
        var user = await userManager.FindByIdAsync(userId.ToString());
        if (user == null)
            throw new UnauthorizedAccessException("User not found");
        
        var host = new Host(user, connectionId);
        var code = Guid.NewGuid().ToString()[..5].ToUpper();
        
        var lobby = new Lobby(host, code);
        Console.WriteLine($"Created new lobby hosted by {host.User.UserName}, connect with code: {code}");
    
        lobbyRepository.Save(lobby);
        return code;
    }
}