namespace SparkMind.Domain.Models;

public class Host
{
    public int UserId { get; set; }
    public Lobby? lobby { get; set; }
}