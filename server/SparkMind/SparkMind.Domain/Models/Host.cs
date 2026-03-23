namespace SparkMind.Domain.Models;

public class Host(User user, string connectionId)
{
    public User User { get; init; } = user;
    public string ConnectionId { get; set; } = connectionId;
}