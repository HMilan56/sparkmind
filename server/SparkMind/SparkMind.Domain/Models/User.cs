using Microsoft.AspNetCore.Identity;

namespace SparkMind.Domain.Models;

public class User : IdentityUser<int>
{
    public List<Quiz> Quizzes { get; set; } = [];
}