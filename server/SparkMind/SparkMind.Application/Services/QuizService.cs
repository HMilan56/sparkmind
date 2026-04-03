using SparkMind.Domain.Interfaces;
using SparkMind.Application.DTOs;
using SparkMind.Application.Interfaces;
using SparkMind.Application.Mappers;

namespace SparkMind.Application.Services;

public class QuizService(QuizMapper mapper, IQuizRepository quizRepository) : IQuizService
{
    public async Task<QuizDataDto?> GetByIdAsync(int userId, int quizId)
    {
        var quiz = await quizRepository.GetByIdAsync(quizId);
        
        if (quiz == null)
            return null;
        
        return quiz.Author.Id != userId ? throw new UnauthorizedAccessException() : mapper.MapToDto(quiz);
    }

    public async Task<IEnumerable<QuizHeaderDto>> GetLibraryAsync(int userId)
    {
        var library = await quizRepository.GetLibraryAsync(userId);
        return library.Select(q => new QuizHeaderDto(q.Id, q.Title, q.Description));
    }

    public async Task DeleteAsync(int userId, int quizId)
    {
        var quiz = await quizRepository.GetByIdAsync(quizId);
        
        if (quiz == null)
            return;
        
        if (quiz.Author.Id != userId)
            throw new UnauthorizedAccessException();
        
        await quizRepository.DeleteAsync(quizId);
    }

    public async Task<QuizDataDto> CreateAsync(int userId)
    {
        var newQuiz = await quizRepository.CreateAsync(userId);
        return mapper.MapToDto(newQuiz);
    }

    public async Task UpdateAsync(int userId, QuizDataDto quizDto)
    {
        var quizModel = await quizRepository.GetByIdAsync(quizDto.Id);
        
        if (quizModel == null)
            return;
        
        if (quizModel.Author.Id != userId)
            throw new UnauthorizedAccessException();
        
        mapper.UpdateFromDtoToDomain(quizDto, quizModel);
        
        await quizRepository.UpdateAsync(quizModel);
    }
}