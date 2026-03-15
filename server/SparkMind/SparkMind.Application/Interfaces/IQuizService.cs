using SparkMind.Application.DTOs;

namespace SparkMind.Application.Interfaces;

public interface IQuizService
{
    Task<QuizDataDto?> GetByIdAsync(int id);
    Task<IEnumerable<QuizHeaderDto>> GetLibraryAsync(int userId);
    Task DeleteAsync(int id);
    Task<QuizDataDto> CreateAsync(int userId);
    Task UpdateAsync(QuizDataDto quiz);
}