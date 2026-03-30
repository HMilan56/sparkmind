namespace SparkMind.Application.DTOs.Game;

public record LobbyStatusUpdate(
    string State,
    DateTimeOffset? Deadline
);