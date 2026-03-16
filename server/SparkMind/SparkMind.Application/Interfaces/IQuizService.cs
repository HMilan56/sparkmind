using SparkMind.Application.DTOs;

namespace SparkMind.Application.Interfaces;

public interface IQuizService
{
    Task<QuizDataDto?> GetByIdAsync(int userId, int quizId);
    Task<IEnumerable<QuizHeaderDto>> GetLibraryAsync(int userId);
    Task DeleteAsync(int userId, int quizId);
    Task<QuizDataDto> CreateAsync(int userId);
    Task UpdateAsync(int userId, QuizDataDto quiz);
}