using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SparkMind.Application.DTOs.Auth;
using SparkMind.Application.Interfaces;
using SparkMind.Domain.Models;

namespace SparkMind.Application.Services;

public class AuthService(UserManager<User> userManager, IConfiguration config)
    : IAuthService
{
    public async Task RegisterAsync(RegisterRequestDto registerRequest)
    {
        var user = new User
        {
            UserName = registerRequest.Username,
            Email = registerRequest.Email
        };
        
        await userManager.CreateAsync(user, registerRequest.Password);
    }

    public async Task<AuthResponseDto?> LoginAsync(LoginRequestDto loginRequestDto)
    {
        var user = await userManager.FindByEmailAsync(loginRequestDto.Email);
        if (user == null)
            return null;

        var valid = await userManager.CheckPasswordAsync(user, loginRequestDto.Password);
        var token = GenerateJwt(user);
        
        return valid ? new AuthResponseDto(token) : null;
    }

    private string GenerateJwt(User user)
    {
        var jwtSettings = config.GetSection("Jwt");

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.UserName ?? ""),
            new Claim(ClaimTypes.Email, user.Email ?? "")
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtSettings["Key"]!)
        );

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(
                int.Parse(jwtSettings["ExpiresInMinutes"]!)
            ),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}