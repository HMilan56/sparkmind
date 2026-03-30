namespace SparkMind.Application.DTOs.Game;

public record QuestionFinishedDto(
    string CorrectAnswer,
    Dictionary<string, int> AnswerStatistics
);