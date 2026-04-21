namespace SparkMind.Application.DTOs.Game;

public record QuestionFinishedDto(
    string Text,
    List<AnswerOptionDto> Answers,
    string CorrectAnswer,
    List<AnswerStatDto> AnswerStatistics,
    List<PlayerStatDto> Leaderboard
);