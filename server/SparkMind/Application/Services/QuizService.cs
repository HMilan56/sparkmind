using Application.DTOs;
using Application.Interfaces;
using Application.Mappers;
using Domain.Interfaces;

namespace Application.Services;

public class QuizService(QuizMapper mapper, IQuizRepository quizRepository) : IQuizService
{
    public async Task<QuizDataDto?> GetByIdAsync(int id)
    {
        var quiz = await quizRepository.GetByIdAsync(id);
        return quiz == null ? null : mapper.MapToDto(quiz);
    }

    public async Task<IEnumerable<QuizHeaderDto>> GetLibraryAsync(int userId)
    {
        var library = await quizRepository.GetLibraryAsync(userId);
        return library.Select(q => new QuizHeaderDto(q.Id, q.Title, q.Description));
    }

    public async Task DeleteAsync(int id)
    {
        await quizRepository.DeleteAsync(id);
    }

    public async Task<QuizDataDto> CreateAsync(int userId)
    {
        var newQuiz = await quizRepository.CreateAsync(userId);
        return mapper.MapToDto(newQuiz);
    }

    public async Task UpdateAsync(QuizDataDto quiz)
    {
        var updatedQuiz = mapper.MapToDomain(quiz);
        await quizRepository.UpdateAsync(updatedQuiz);
    }
}