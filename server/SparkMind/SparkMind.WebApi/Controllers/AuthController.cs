using Microsoft.AspNetCore.Mvc;
using SparkMind.Application.DTOs.Auth;
using SparkMind.Application.Interfaces;

namespace SparkMind.WebApi.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(IAuthService authService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequestDto registerRequestDto)
    {
        await authService.RegisterAsync(registerRequestDto);
        return Ok();
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequestDto dto)
    {
        var response = await authService.LoginAsync(dto);
        return Ok(response);
    }
}