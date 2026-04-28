using System.Net.Http.Headers;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;
using Respawn;
using SparkMind.Application.DTOs.Auth;
using SparkMind.Domain.Models;
using SparkMind.Infrastructure.Data;
using SparkMind.Tests.Util;
using Testcontainers.PostgreSql;

namespace SparkMind.Tests.Integration.Fixtures;

public class SparkMindFactory : WebApplicationFactory<Program>, IAsyncLifetime
{
    private Respawner _respawner = null!;
    public HttpClient Client { get; private set; }
    
    private readonly PostgreSqlContainer _dbContainer = new PostgreSqlBuilder("postgres:16-alpine")
        .WithDatabase("sparkmind_test")
        .WithUsername("test")
        .WithPassword("test")
        .Build();

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureAppConfiguration((context, config) =>
        {
            config.AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["Jwt:Key"] = "TEST_KEY_FOR_SPARKMIND_INTEGRATION",
                ["Jwt:Issuer"] = "SparkMind",
                ["Jwt:Audience"] = "SparkMindUsers"
            });
        });

        builder.ConfigureServices(services =>
        {
            var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(DbContextOptions<AppDbContext>));
            if (descriptor != null) services.Remove(descriptor);

            services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(_dbContainer.GetConnectionString()));

            var sp = services.BuildServiceProvider();
            using var scope = sp.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            db.Database.EnsureCreated();
        });
    }

    public async Task InitializeAsync()
    {
        await _dbContainer.StartAsync();
        Client = CreateClient();

        await using var conn = new NpgsqlConnection(_dbContainer.GetConnectionString());
        await conn.OpenAsync();
        _respawner = await Respawner.CreateAsync(conn, new RespawnerOptions
        {
            DbAdapter = DbAdapter.Postgres,
            TablesToIgnore = ["__EFMigrationsHistory"]
        });
    }

    public async Task ResetAsync()
    {
        await using var conn = new NpgsqlConnection(_dbContainer.GetConnectionString());
        await conn.OpenAsync();
        await _respawner.ResetAsync(conn);
    }
    
    public async Task<int> SeedUserAsync(string email, string password)
    {
        using var scope = Services.CreateScope();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
    
        var user = await userManager.FindByEmailAsync(email);
        if (user == null)
        {
            user = new User { UserName = email, Email = email };
            var result = await userManager.CreateAsync(user, password);
            if (!result.Succeeded)
            {
                throw new Exception($"Failed to seed user: {string.Join(", ", result.Errors.Select(e => e.Description))}");
            }
        }

        return user.Id;
    }

    public async Task<int> SeedQuizAsync(int userId)
    {
        using var scope = Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        var author = await db.Users.FindAsync(userId) 
                     ?? throw new ArgumentException($"Quiz author with ID {userId} not found in database.");

        var quiz = new QuizBuilder($"Integration Test Quiz {Guid.NewGuid().ToString()[..4]}", author)
            .AddQuestion("Test Question #1", q => q
                .AddAnswer("Answer #1", true)
                .AddAnswer("Answer #2", false)
                .AddAnswer("Answer #3", false)
                .AddAnswer("Answer #4", false)
                .WithSettings(s =>
                {
                    s.PreviewTime = 1;
                    s.TimeLimit = 5;
                })
            ).Build();
        
        db.Quizzes.Add(quiz);
        await db.SaveChangesAsync();

        return quiz.Id;
    }
    
    public async Task<int> SeedQuizAsync(int userId, Action<QuizBuilder> configure)
    {
        using var scope = Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        var author = await db.Users.FindAsync(userId) 
                     ?? throw new ArgumentException($"User {userId} not found.");

        var builder = new QuizBuilder("Default Title", author);
    
        configure(builder);

        var quiz = builder.Build();
    
        db.Quizzes.Add(quiz);
        await db.SaveChangesAsync();

        return quiz.Id;
    }
    
    public async Task<(int UserId, string AccessToken)> AuthenticateAsync()
    {
        await ResetAsync();

        const string email = "test@test.com";
        const string password = "Password123!";
        var userId = await SeedUserAsync(email, password);

        var loginRequest = new { Email = email, Password = password };
        var response = await Client.PostAsJsonAsync("/api/auth/login", loginRequest);
    
        if (!response.IsSuccessStatusCode)
            throw new Exception("Auth helper failed to log in.");

        var loginResult = await response.Content.ReadFromJsonAsync<AuthResponseDto>();

        Client.DefaultRequestHeaders.Authorization = 
            new AuthenticationHeaderValue("Bearer", loginResult!.Token);

        return (userId, loginResult!.Token);
    }
    

    private HubConnection CreateHubConnection(string accessToken)
    {
        return new HubConnectionBuilder()
            .WithUrl("http://localhost/game", options =>
            {
                options.AccessTokenProvider = () => Task.FromResult(accessToken)!;
                options.HttpMessageHandlerFactory = _ => Server.CreateHandler();
            })
            .Build();
    }
    
    public async Task<HubConnection> GetStartedConnectionAsync(string token)
    {
        var connection = CreateHubConnection(token);
        await connection.StartAsync();
        return connection;
    }

    public new async Task DisposeAsync() => await _dbContainer.StopAsync();
}