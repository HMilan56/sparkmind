using Domain.Models;

namespace Application.DTOs;

public record QuizHeaderDto(int Id, string Title, string Desc);

public record QuizSettingsDto(bool ShuffleQuestions, bool RandomizePlayerNames);

public record QuestionSettingsDto(string Setting1, string Setting2);

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
    string Description,
    QuizMode Mode,
    QuizSettingsDto Settings,
    List<QuestionDataDto> Questions
);