using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using SparkMind.Application.Interfaces;
using SparkMind.Application.Services;
using SparkMind.Domain.Interfaces;
using SparkMind.Domain.Models;
using SparkMind.Infrastructure.Repositories;

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
        
        lobby.RequestNextStep();
        
        stateMachine.State.Should().Be(LobbyState.QuestionPreview);
        
        lobby.RequestNextStep();
        
        stateMachine.State.Should().Be(LobbyState.QuestionActive);

        lobby.RequestNextStep();
        
        stateMachine.State.Should().Be(LobbyState.QuestionFinished);
        
        lobby.RequestNextStep();
        
        stateMachine.State.Should().Be(LobbyState.QuestionPreview);
        
        lobby.RequestNextStep();
        
        stateMachine.State.Should().Be(LobbyState.QuestionActive);
        
        lobby.RequestNextStep();
        
        stateMachine.State.Should().Be(LobbyState.QuestionFinished);
        
        lobby.RequestNextStep();
        
        stateMachine.State.Should().Be(LobbyState.GameOver);
    }

    [Fact]
    public async Task AutoAdvanceTest()
    {
        var questions = new List<Question> { new Question(), new Question() };
        var lobby = new Lobby(1, new Quiz { Questions = questions });
        var realRepo = new LobbyRepository();
        realRepo.Save(lobby);

        var notifierMock = new Mock<IGameNotificationService>();
        var providerMock = new Mock<IServiceProvider>();
        providerMock.Setup(x => x.GetService(typeof(ILobbyRepository))).Returns(realRepo);
        providerMock.Setup(x => x.GetService(typeof(IGameNotificationService))).Returns(notifierMock.Object);

        var scopeMock = new Mock<IServiceScope>();
        scopeMock.Setup(x => x.ServiceProvider).Returns(providerMock.Object);
        var factoryMock = new Mock<IServiceScopeFactory>();
        factoryMock.Setup(x => x.CreateScope()).Returns(scopeMock.Object);

        var gameLoopService = new GameLoopService(factoryMock.Object);
    
        lobby.RequestNextStep();
        lobby.StateMachine.State.Should().Be(LobbyState.QuestionPreview);

        await Task.Delay(4000); 

        await gameLoopService.TickAsync();
    
        lobby.StateMachine.State.Should().Be(LobbyState.QuestionActive);
    }
}
