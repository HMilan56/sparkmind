using FluentAssertions;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SparkMind.Application.Interfaces;
using SparkMind.Domain.Interfaces;
using SparkMind.Infrastructure.Data;
using SparkMind.Tests.Integration.Fixtures;

namespace SparkMind.Tests.Integration.Lobby;

public class LobbyTests(SparkMindFactory factory) : IClassFixture<SparkMindFactory>
{
    [Fact]
    public async Task CreateOrGetLobby_WithValidUser_ReturnsCode()
    {
        // Arrange
        var (_, accessToken) = await factory.AuthenticateAsync();
        int quizId;

        using (var scope = factory.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var user = await db.Users.FirstAsync();
            var quiz = new Domain.Models.Quiz { Title = "Test Quiz", Author = user };
            db.Quizzes.Add(quiz);
            await db.SaveChangesAsync();
            quizId = quiz.Id;
        }

        await using var connection = await factory.GetStartedConnectionAsync(accessToken);

        // Act
        var lobbyCode = await connection.InvokeAsync<string>("CreateOrGetLobby", quizId);
        
        // Assert
        lobbyCode.Should().NotBeNullOrWhiteSpace();
    }
    
    [Fact]
    public async Task JoinLobby_ValidCode_AddsUserToLobby()
    {
        // Arrange
        var (userId, accessToken) = await factory.AuthenticateAsync();
        var quizId = await factory.SeedQuizAsync(userId);
    
        await using var hostConn = await factory.GetStartedConnectionAsync(accessToken);
        var lobbyCode = await hostConn.InvokeAsync<string>("CreateOrGetLobby", quizId);

        await using var playerConn = await factory.GetStartedConnectionAsync(string.Empty);
    
        const string playerName = "TestPlayer1";

        // Act
        await playerConn.InvokeAsync("JoinLobby", lobbyCode, playerName);

        // Assert
        using var scope = factory.Services.CreateScope();
        var lobbyService = scope.ServiceProvider.GetRequiredService<ILobbyService>();
    
        var lobby = await lobbyService.GetByCodeAsync(lobbyCode);
    
        lobby.Should().NotBeNull();
        lobby!.Players.Should().Contain(p => p.Name == playerName);
    }
    
    [Fact]
    public async Task JoinLobby_InvalidCode_Throws_Exception()
    {
        // Arrange
        await factory.ResetAsync();

        var playerConn = await factory.GetStartedConnectionAsync(string.Empty);

        try 
        {
            const string invalidCode = "000000";
            const string playerName = "SadPlayer";

            // Act
            var act = async () => await playerConn.InvokeAsync("JoinLobby", invalidCode, playerName);

            // Assert
            await act.Should().ThrowAsync<HubException>();
        }
        finally 
        {
            await playerConn.DisposeAsync();
        }
    }
}