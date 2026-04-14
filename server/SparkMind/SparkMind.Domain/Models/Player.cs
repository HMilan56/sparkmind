using SparkMind.Domain.Interfaces;

namespace SparkMind.Domain.Models;

public class Player : IPlayer
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; } = "";
    public string SubmittedAnswer { get; set; } = "";
    public int SubmitTime { get; set; }
    public bool IsOnline { get; set; }
    public int Score { get; set; }
    public int Delta { get; set; }
    public int Streak { get; set; }
    public required Lobby Lobby { get; set; }
    
}