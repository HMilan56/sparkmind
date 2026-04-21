using SparkMind.Domain.Models;

namespace SparkMind.Application.DTOs;

public record QuizHeaderDto(int Id, string Title, string Desc);

public record QuizSettingsDto(bool ShuffleQuestions, bool RandomizePlayerNames);

public record QuestionSettingsDto(int PreviewTime, int TimeLimit);

public record AnswerDataDto(int Id, string Text, bool IsCorrect);

public record QuestionDataDto(
    int Id, 
    string Text, 
    List<AnswerDataDto> Answers, 
    QuestionSettingsDto Settings
);

public record QuizDataDto(
    int Id,
    string Title,
    string Desc,
    QuizMode Mode,
    QuizSettingsDto Settings,
    List<QuestionDataDto> Questions
);