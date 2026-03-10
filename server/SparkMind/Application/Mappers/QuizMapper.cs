using Riok.Mapperly.Abstractions;
using Application.DTOs;
using Domain.Models;

namespace Application.Mappers;

[Mapper]
public partial class QuizMapper
{
    public partial Quiz MapToDomain(QuizDataDto dto);
    public partial QuizDataDto MapToDto(Quiz quiz);

    public partial Question MapToDomain(QuestionDataDto dto);
    public partial QuestionDataDto MapToDto(Question question);
    
    public partial Answer MapToDomain(AnswerDataDto dto);
    public partial AnswerDataDto MapToDto(Answer answer);

    public partial QuizSettings MapToDomain(QuizSettingsDto dto);
    public partial QuizSettingsDto MapToDto(QuizSettings settings);
}