using SparkMind.Domain.Models;

namespace SparkMind.Domain.Interfaces;

public interface IPlayer
{
    public string Id { get; set; }
    public string Name { get; }
    public Lobby Lobby { get; }
    public string SubmittedAnswer { get; }
    public int SubmitTime { get;  }
    public bool IsOnline { get; set; }
    public int Score { get; }
    public int Delta { get; }
    public int Streak { get; }
    
}