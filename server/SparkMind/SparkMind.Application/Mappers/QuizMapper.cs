using Riok.Mapperly.Abstractions;
using SparkMind.Domain.Models;
using SparkMind.Application.DTOs;

namespace SparkMind.Application.Mappers;

[Mapper]
public partial class QuizMapper
{
    [MapProperty(nameof(QuizDataDto.Desc), nameof(Quiz.Description))]
    [MapperIgnoreTarget(nameof(Quiz.Author))]
    public partial void UpdateFromDtoToDomain(QuizDataDto dto, Quiz quiz);
    
    [MapProperty(nameof(Quiz.Description), nameof(QuizDataDto.Desc))]
    [MapperIgnoreSource(nameof(Quiz.Author))]
    public partial QuizDataDto MapToDto(Quiz quiz);

    [MapperIgnoreTarget(nameof(Question.Quiz))]
    private partial Question MapToDomain(QuestionDataDto dto);
    [MapperIgnoreSource(nameof(Question.Quiz))]
    private partial QuestionDataDto MapToDto(Question question);
    
    [MapperIgnoreTarget(nameof(Answer.Question))]
    private partial Answer MapToDomain(AnswerDataDto dto);
    [MapperIgnoreSource(nameof(Answer.Question))]
    private partial AnswerDataDto MapToDto(Answer answer);

    private partial QuizSettings MapToDomain(QuizSettingsDto dto);
    private partial QuizSettingsDto MapToDto(QuizSettings settings);
}