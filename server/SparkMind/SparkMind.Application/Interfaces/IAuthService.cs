using SparkMind.Application.DTOs.Auth;
using SparkMind.Domain.Models;

namespace SparkMind.Application.Interfaces;

public interface IAuthService
{
    Task RegisterAsync(RegisterRequestDto registerRequestDto);
    Task<AuthResponseDto?> LoginAsync(LoginRequestDto loginRequestDto);
    Task<User> GetUserAsync(int userId);
}

