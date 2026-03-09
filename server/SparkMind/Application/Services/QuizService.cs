using Application.DTOs;
using Application.Interfaces;
using Application.Mappers;
using Domain.Interfaces;

namespace Application.Services;

public class QuizService(QuizMapper mapper, IQuizRepository quizRepository) : IQuizService
{
    public async Task<QuizDataDto?> GetQuizByIdAsync(int id)
    {
        var quiz = await quizRepository.GetQuizByIdAsync(id);
        return quiz == null ? null : mapper.MapToDataDto(quiz);
    }

    public Task<IEnumerable<QuizHeaderDto>> GetAllQuizHeadersAsync(int userId)
    {
        throw new NotImplementedException();
    }
}