using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.Extensions.DependencyInjection;
using SparkMind.Infrastructure.Data;
using SparkMind.Tests.Integration.Fixtures;

namespace SparkMind.Tests.Integration.Game;

public abstract class GameTestBase(SparkMindFactory factory) : IClassFixture<SparkMindFactory>
{
    protected string LobbyCode { get; private set; } = null!;
    protected HubConnection HostConn { get; private set; } = null!;
    protected HubConnection PlayerConn { get; private set; } = null!;
    protected int CorrectAnswerId { get; private set; }
    protected int WrongAnswerId { get; private set; }

    protected async Task SetupGameEnvironmentAsync()
    {
        await factory.ResetAsync();
        var (userId, token) = await factory.AuthenticateAsync();

        var quizId = await factory.SeedQuizAsync(userId, builder => builder
            .AddQuestion("The Question", q => q
                .AddAnswer("Correct", true)
                .AddAnswer("Wrong1", false)
                .AddAnswer("Wrong2", false)
                .AddAnswer("Wrong3", false)
            )
        );

        using (var scope = factory.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            CorrectAnswerId = 1;
            WrongAnswerId = 2;
        }

        HostConn = await factory.GetStartedConnectionAsync(token);
        LobbyCode = await HostConn.InvokeAsync<string>("CreateOrGetLobby", quizId);
        
        PlayerConn = await factory.GetStartedConnectionAsync("");
        await PlayerConn.InvokeAsync("JoinLobby", LobbyCode, "TestPlayer");
    }

    protected static async Task WaitForState(TaskCompletionSource tcs, string timeoutMessage, int timeout = 5000)
    {
        try
        {
            await tcs.Task.WaitAsync(TimeSpan.FromMilliseconds(timeout));
        }
        catch (TimeoutException)
        {
            throw new TimeoutException(timeoutMessage);
        }
    }
    
    protected static async Task<T> WaitForState<T>(TaskCompletionSource<T> tcs, string timeoutMessage, int timeout = 5000)
    {
        try
        {
            return await tcs.Task.WaitAsync(TimeSpan.FromMilliseconds(timeout));
        }
        catch (TimeoutException)
        {
            throw new TimeoutException(timeoutMessage);
        }
    }
}