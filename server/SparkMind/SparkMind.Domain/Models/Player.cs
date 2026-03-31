using SparkMind.Domain.Interfaces;

namespace SparkMind.Domain.Models;

public class Player : IPlayer
{
    public string SubmittedAnswer { get; set; } = "";
    public bool IsOnline { get; set; }
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; } = "";
    public required Lobby Lobby { get; set; }
    
}