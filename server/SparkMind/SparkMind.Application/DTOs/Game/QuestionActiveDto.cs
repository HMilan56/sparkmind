using SparkMind.Domain.Models;

namespace SparkMind.Application.DTOs.Game;

public record QuestionActiveDto(
    string Text,
    List<AnswerOptionDto> Answers
);