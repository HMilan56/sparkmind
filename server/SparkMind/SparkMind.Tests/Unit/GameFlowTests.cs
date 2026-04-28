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
        throw new NotImplementedException();
    }
}