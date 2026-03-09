using Application.DTOs;
using Domain.Models;
using Riok.Mapperly.Abstractions;

namespace Application.Mappers;

[Mapper]
public partial class QuizMapper
{
    public QuizDataDto MapToDataDto(Quiz quiz)
    {
        return new QuizDataDto(
            Header: MapToHeader(quiz),
            Mode: quiz.Mode.ToString(),
            Settings: MapSettings(quiz.Settings),
            Questions: quiz.Questions.Select(MapQuestion).ToList()
        );
    }

    [MapProperty(nameof(Quiz.Description), nameof(QuizHeaderDto.Desc))]
    [MapperIgnoreSource(nameof(Quiz.Questions))]
    [MapperIgnoreSource(nameof(Quiz.Mode))]
    [MapperIgnoreSource(nameof(Quiz.Settings))]
    [MapperIgnoreSource(nameof(Quiz.Author))]
    private partial QuizHeaderDto MapToHeader(Quiz quiz);

    private partial QuizSettingsDto MapSettings(QuizSettings settings);

    private QuestionDataDto MapQuestion(Question question)
    {
        return new QuestionDataDto(
            question.Id,
            question.Text,
            question.Answers.Select(MapAnswer).ToList(),
            new QuestionSettingsDto("", "") // TODO: develop and implement settings
        );
    }

    [MapperIgnoreSource(nameof(Answer.Question))]
    [MapProperty(nameof(Answer.Text), nameof(AnswerDataDto.Answer))]
    [MapProperty(nameof(Answer.IsCorrect), nameof(AnswerDataDto.Correct))]
    private partial AnswerDataDto MapAnswer(Answer answer);
}