using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Moq;
using SparkMind.Application.Interfaces;
using SparkMind.Application.Services;
using SparkMind.Domain.Interfaces;
using SparkMind.Domain.Models;
using SparkMind.Infrastructure.Repositories;

namespace SparkMind.Tests;

public class GameFlowTests
{
    private Mock<UserManager<User>> GetUserManagerMock()
    {
        var store = new Mock<IUserStore<User>>();
        var mgr = new Mock<UserManager<User>>(
            store.Object, null, null, null, null, null, null, null, null);
    
        mgr.Setup(x => x.FindByIdAsync(It.IsAny<string>()))
            .ReturnsAsync((string id) => new User { Id = int.Parse(id), UserName = "TestUser" });
       
        return mgr;
    }

    [Fact]
    public async Task CreateAndJoinLobbyThenSubmitAnswer()
    {
        var lobbyRepo = new LobbyRepository();
    var connRepo = new ConnectionRepository();
    var notifierMock = new Mock<IGameNotificationService>();
    var quizRepoMock = new Mock<IQuizRepository>();
    var userManagerMock = GetUserManagerMock();

    var lobbyService = new LobbyService(
        notifierMock.Object,
        lobbyRepo,
        quizRepoMock.Object,
        connRepo,
        userManagerMock.Object
    );

    var quiz = new Quiz 
    { 
        Id = 1, 
        Questions = new List<Question> { 
            new Question { 
                Id = 10, 
                Text = "Mennyi 2+2?", 
                Answers = new List<Answer> { 
                    new Answer { Id = 100, Text = "4", IsCorrect = true },
                    new Answer { Id = 101, Text = "5", IsCorrect = false }
                } 
            } 
        } 
    };
    quizRepoMock.Setup(x => x.GetByIdAsync(1)).ReturnsAsync(quiz);

    string hostConnId = "host_connection";
    var lobbyCode = await lobbyService.CreateOrGetLobby(99, hostConnId, 1);
    var lobby = lobbyRepo.GetByCode(lobbyCode);

    string playerConnId = "player_connection";
    await lobbyService.JoinLobby(lobbyCode, "Teszt Elek", playerConnId);
    
    lobby.Players.Should().HaveCount(1);
    lobby.Players.First().Name.Should().Be("Teszt Elek");

    await lobbyService.RequestNextStep(99);
    lobby.StateMachine.State.Should().Be(LobbyState.QuestionPreview);

    lobby.RequestNextStep();
    lobby.StateMachine.State.Should().Be(LobbyState.QuestionActive);


    await lobbyService.SubmitAnswer(playerConnId, "4");
    lobby.RequestNextStep();

    lobby.Players.First().SubmittedAnswer.Should().Be("4");
    lobby.StateMachine.State.Should().Be(LobbyState.QuestionFinished);
    
    notifierMock.Verify(x => x.NotifyAnswerSubmitted(lobbyCode, "Teszt Elek"), Times.AtLeastOnce());
    }
}