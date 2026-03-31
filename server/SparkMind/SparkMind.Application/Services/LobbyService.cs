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
    IConnectionRepository connectionRepository,
    UserManager<User> userManager
) : ILobbyService
{
    public async Task JoinLobby(string code, string name, string connectionId)
    {
        var lobby = lobbyRepository.GetByCode(code);
        var player = lobby?.AddOrGetPlayer(name);

        if (player != null)
        {
            connectionRepository.AddPlayer(connectionId, player);
            await notifier.NotifyHostPlayerJoined(code, name);
        }
    }

    public async Task<string> CreateOrGetLobby(int userId, string connectionId, int quizId)
    {
        var user = await userManager.FindByIdAsync(userId.ToString());
        if (user == null)
            throw new UnauthorizedAccessException("User not found");

        var lobby = lobbyRepository.GetByHost(user.Id);
        if (lobby != null)
            return lobby.Code;

        var quiz = await quizRepository.GetByIdAsync(quizId);
        if (quiz == null)
            throw new ArgumentException("Quiz not found");

        lobby = new Lobby(userId, quiz);

        lobbyRepository.Save(lobby);
        connectionRepository.AddHost(connectionId, lobby.Host);

        Console.WriteLine($"Created new lobby hosted by {user.UserName}, connect with code: {lobby.Code}");

        return lobby.Code;
    }

    public Task RequestNextStep(int userId)
    {
        var lobby = lobbyRepository.GetByHost(userId);
        if (lobby == null)
            throw new Exception($"Cannot find lobby owned by user id: {userId}");
        
        lobby.RequestNextStep();

        return Task.CompletedTask;
    }

    public async Task SubmitAnswer(string connectionId, string answer)
    {
        var player = connectionRepository.GetPlayerByConnectionId(connectionId);
        if (player == null)
            throw new Exception($"Cannot find player by connection id: {connectionId}");

        var lobby = player.Lobby;
        lobby.SubmitAnswer(player, answer);
        
        await notifier.NotifyAnswerSubmitted(player.Lobby.Code, player.Name);
    }

    public async Task Disconnect(string connectionId)
    {
        var player = connectionRepository.GetPlayerByConnectionId(connectionId);
        if (player != null)
        {
            await notifier.NotifyHostPlayerLeft(player.Lobby.Code, player.Name);
        }
    }
}