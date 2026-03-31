using SparkMind.Domain.Models;

namespace SparkMind.Domain.Interfaces;

public interface IPlayer
{
    public string Id { get; set; }
    public string Name { get; set; }
    public Lobby Lobby { get; set; }
}