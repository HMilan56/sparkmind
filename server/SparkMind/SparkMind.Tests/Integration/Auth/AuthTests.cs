using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SparkMind.Application.DTOs.Auth;
using SparkMind.Application.Interfaces;
using SparkMind.Infrastructure.Data;
using SparkMind.Tests.Integration.Fixtures;
using Xunit.Abstractions;

namespace SparkMind.Tests.Integration.Auth;

public class AuthTests(SparkMindFactory factory, ITestOutputHelper testOutputHelper) : IClassFixture<SparkMindFactory>, IAsyncLifetime
{
    public async Task InitializeAsync() => await factory.ResetAsync();
    
    public Task DisposeAsync() => Task.CompletedTask;
 
    private HttpClient Client => factory.Client;
    
    [Fact]
    public async Task Register_ValidUser_ReturnsSuccess()
    {
        // Arrange
        var request = new RegisterRequestDto("testmail@test.com", "test", "TestUser");

        // Act
        var response = await Client.PostAsJsonAsync("/api/auth/register", request);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);

        using var scope = factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var user = await db.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        user.Should().NotBeNull();
        user!.UserName.Should().Be("TestUser");
    }

    [Fact]
    public async Task Login_WithCorrectCredentials_ReturnsJwt()
    {
        // Arrange
        var registerRequest = new RegisterRequestDto("login@test.com", "Password123!", "LoginUser");
        await Client.PostAsJsonAsync("/api/auth/register", registerRequest);

        var loginRequest = new LoginRequestDto("login@test.com", "Password123!");

        // Act
        var response = await Client.PostAsJsonAsync("/api/auth/login", loginRequest);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);

        var result = await response.Content.ReadFromJsonAsync<AuthResponseDto>();
        result.Should().NotBeNull();
        result!.Token.Should().NotBeNullOrEmpty();

        testOutputHelper.WriteLine("Captured JWT access token: " + result.Token);
    }
    
    [Fact]
    public async Task Login_WithInvalidPassword_ReturnsUnauthorized()
    {
        // Arrange
        var registerRequest = new RegisterRequestDto("user@test.com", "CorrectPassword123!", "TestUser");
        await Client.PostAsJsonAsync("/api/auth/register", registerRequest);

        var loginRequest = new LoginRequestDto("user@test.com", "WrongPassword123!");

        // Act
        var response = await Client.PostAsJsonAsync("/api/auth/login", loginRequest);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }
    
    [Fact]
    public async Task AccessProtectedEndpoint_WithoutToken_Returns401()
    {
        // Act
        var response = await Client.GetAsync("/api/quiz/library");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }
}