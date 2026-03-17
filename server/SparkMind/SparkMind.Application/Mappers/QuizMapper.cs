using Riok.Mapperly.Abstractions;
using SparkMind.Domain.Models;
using SparkMind.Application.DTOs;

namespace SparkMind.Application.Mappers;

[Mapper]
public partial class QuizMapper
{
    [MapProperty(nameof(QuizDataDto.Desc), nameof(Quiz.Description))]
    public partial Quiz MapToDomain(QuizDataDto dto);
    
    [MapProperty(nameof(Quiz.Description), nameof(QuizDataDto.Desc))]
    public partial QuizDataDto MapToDto(Quiz quiz);

    public partial Question MapToDomain(QuestionDataDto dto);
    public partial QuestionDataDto MapToDto(Question question);
    
    public partial Answer MapToDomain(AnswerDataDto dto);
    public partial AnswerDataDto MapToDto(Answer answer);

    public partial QuizSettings MapToDomain(QuizSettingsDto dto);
    public partial QuizSettingsDto MapToDto(QuizSettings settings);
}