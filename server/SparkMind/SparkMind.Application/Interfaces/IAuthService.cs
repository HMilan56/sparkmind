using SparkMind.Application.DTOs.Auth;

namespace SparkMind.Application.Interfaces;

public interface IAuthService
{
    Task RegisterAsync(RegisterRequestDto registerRequestDto);
    
    Task<AuthResponseDto?> LoginAsync(LoginRequestDto loginRequestDto);
}

