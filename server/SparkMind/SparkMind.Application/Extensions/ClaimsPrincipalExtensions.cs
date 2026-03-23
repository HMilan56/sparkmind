namespace SparkMind.Application.Extensions;

using System.Security.Claims;

public static class ClaimsPrincipalExtensions
{
    public static int GetUserId(this ClaimsPrincipal user)
    {
        var idClaim = user.FindFirstValue(ClaimTypes.NameIdentifier);
        
        if (string.IsNullOrEmpty(idClaim))
            throw new UnauthorizedAccessException("User identification failed.");

        return int.Parse(idClaim);
    }
}