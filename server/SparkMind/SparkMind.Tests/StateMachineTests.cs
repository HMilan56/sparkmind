using FluentAssertions;
using Moq;
using SparkMind.Application.Interfaces;
using SparkMind.Application.Services;
using SparkMind.Domain.Models;

namespace SparkMind.Tests;

public class StateMachineTests
{
    [Fact]
    public void StateTransitionTest()
    {
        List<Question> questions =
        [
            new Question(),
            new Question(),
        ];
        
        var lobby = new Lobby(1, new Quiz { Questions = questions });
        var stateMachine = lobby.StateMachine;
        
        stateMachine.State.Should().Be(LobbyState.WaitingForStart);
        
        stateMachine.Advance();
        
        stateMachine.State.Should().Be(LobbyState.QuestionPreview);
        
        stateMachine.Advance();
        
        stateMachine.State.Should().Be(LobbyState.QuestionActive);

        stateMachine.Advance();
        
        stateMachine.State.Should().Be(LobbyState.QuestionFinished);
        
        stateMachine.Advance();
        
        stateMachine.State.Should().Be(LobbyState.QuestionPreview);
        
        stateMachine.Advance();
        
        stateMachine.State.Should().Be(LobbyState.QuestionActive);
        
        stateMachine.Advance();
        
        stateMachine.State.Should().Be(LobbyState.QuestionFinished);
        
        stateMachine.Advance();
        
        stateMachine.State.Should().Be(LobbyState.GameOver);
    }

    [Fact]
    public async Task AutoAdvanceTest()
    {
        List<Question> questions =
        [
            new Question(),
            new Question(),
        ];
        
        var lobby = new Lobby(1, new Quiz { Questions = questions });
        var stateMachine = lobby.StateMachine;
        var lobbyService = new Mock<ILobbyService>();
        
        lobbyService.Setup(s => s.GetActiveLobbies()).ReturnsAsync([lobby]);
        
        var gameLoopService = new GameLoopService(lobbyService.Object);
        
        var ctk = new CancellationTokenSource();
        await gameLoopService.StartAsync(ctk.Token);
        
        stateMachine.State.Should().Be(LobbyState.WaitingForStart);
        
        stateMachine.Advance();
        
        stateMachine.State.Should().Be(LobbyState.QuestionPreview);
        
        await Task.Delay(4000);
        
        stateMachine.State.Should().Be(LobbyState.QuestionActive);
        
        await gameLoopService.StopAsync(ctk.Token);
    }
}
