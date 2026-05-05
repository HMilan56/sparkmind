using FluentAssertions;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.Extensions.DependencyInjection;
using SparkMind.Application.Interfaces;
using SparkMind.Tests.Integration.Fixtures;
using Xunit.Abstractions;

namespace SparkMind.Tests.Integration.Game;

public class GameTests(SparkMindFactory factory, ITestOutputHelper testLogger) : GameTestBase(factory), IAsyncLifetime
{
    public async Task InitializeAsync() => await SetupGameEnvironmentAsync();

    public Task DisposeAsync() => Task.CompletedTask;

    private async Task RunScoringTest(bool useCorrectAnswer, string assertionMessage)
    {
        // Arrange
        await SetupGameEnvironmentAsync();
        var questionActive = new TaskCompletionSource();
        var questionFinished = new TaskCompletionSource();
        PlayerConn.On<PlayerUpdateNotification>("PlayerUpdate", x => {
            if (x.Type == "QuestionActive") questionActive.TrySetResult();
            if (x.Type == "QuestionFinished") questionFinished.TrySetResult();
        });

        // Act
        await HostConn.InvokeAsync("RequestNextStep");
        await WaitForState(questionActive, "State never reached QuestionActive");
        
        await PlayerConn.InvokeAsync("SubmitAnswer", useCorrectAnswer ? CorrectAnswerId : WrongAnswerId);
        await WaitForState(questionFinished, "State never reached QuestionFinished");

        // Assert
        using var scope = factory.Services.CreateScope();
        var lobbyService = scope.ServiceProvider.GetRequiredService<ILobbyService>();
        var lobby = await lobbyService.GetByCodeAsync(LobbyCode);

        var score = lobby.Players[0].Score;

        if (useCorrectAnswer)
        {
            score.Should().BePositive();
        }
        else
        {
            score.Should().Be(0);
        }
    }
    
    [Fact]
    public async Task SubmitCorrectAnswer_IncreasesPlayerScore()
    {
        await RunScoringTest(true, "because the player submitted the correct answer");
    }

    [Fact]
    public async Task SubmitWrongAnswer_DoesNotIncreaseScore()
    {
        await RunScoringTest(useCorrectAnswer: false, "because the player submitted a wrong answer");
    }

    [Fact]
    public async Task AdvanceToNextQuestion_BroadcastsToAllClients()
    {
        // Arrange
        await SetupGameEnvironmentAsync();

        await using var player2Conn = await factory.GetStartedConnectionAsync("");
        await player2Conn.InvokeAsync("JoinLobby", LobbyCode, "SecondPlayer");

        var p1Received = new TaskCompletionSource<PlayerUpdateNotification>();
        var p2Received = new TaskCompletionSource<PlayerUpdateNotification>();

        PlayerConn.On<PlayerUpdateNotification>("PlayerUpdate", n =>
        {
            if (n.Type == "QuestionActive")
            {
                p1Received.TrySetResult(n);
            }
        });
        
        player2Conn.On<PlayerUpdateNotification>("PlayerUpdate", n =>
        {
            if (n.Type == "QuestionActive")
            {
                p2Received.TrySetResult(n);
            }
        });

        // Act
        await HostConn.InvokeAsync("RequestNextStep");

        // Assert
        var n1 = await WaitForState(p1Received, "State never reached QuestionActive for player 1");
        var n2 = await WaitForState(p2Received, "State never reached QuestionActive for player 2");

        n1.Type.Should().Be("QuestionActive");
        n2.Type.Should().Be("QuestionActive");
    }
    
    [Fact]
    public async Task GameLoop_OnTimerExpired_AutoSubmitsAndMovesNext()
    {
        // Arrange
        await SetupGameEnvironmentAsync();

        var questionActive = new TaskCompletionSource();
        var questionFinished = new TaskCompletionSource();

        PlayerConn.On<PlayerUpdateNotification>("PlayerUpdate", n =>
        {
            switch (n.Type)
            {
                case "QuestionActive":
                    questionActive.TrySetResult();
                    break;
                case "QuestionFinished":
                    questionFinished.TrySetResult();
                    break;
            }
        });

        // Act
        await HostConn.InvokeAsync("RequestNextStep");
        await WaitForState(questionActive, "Question never started");
        await WaitForState(questionFinished, "Game loop failed to auto-advance after timeout", timeout: 3000);

        // Assert
        using var scope = factory.Services.CreateScope();
        var lobbyService = scope.ServiceProvider.GetRequiredService<ILobbyService>();
        var lobby = await lobbyService.GetByCodeAsync(LobbyCode);
    
        lobby!.Players[0].Score.Should().Be(0);
        lobby.StateMachine.State.ToString().Should().Be("QuestionFinished");
    }
}

public class PlayerUpdateNotification
{
    public string Type { get; set; } = string.Empty;
    public long? Deadline { get; set; }
    public object? Payload { get; set; }
    public long ServerTime { get; set; }
}