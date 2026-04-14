namespace SparkMind.Application.DTOs.Game;

public record PlayerStatDto(
    string Id,
    string Name,
    bool AnsweredCorrectly,
    int Score,
    int Delta,
    int Streak
);