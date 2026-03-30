namespace SparkMind.Domain.Models;

public class Player
{
    public string SubmittedAnswer { get; set; } = "";
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; } = "";
    public required Lobby Lobby { get; set; }

}