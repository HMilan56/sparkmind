using SparkMind.Domain.Models;

namespace SparkMind.Domain.Interfaces;

public interface IQuizRepository
{
    Task<Quiz?> GetByIdAsync(int id);
    Task<IEnumerable<Quiz>> GetLibraryAsync(int userId);
    Task DeleteAsync(int id);
    Task<Quiz> CreateAsync(int userId);
    Task UpdateAsync(Quiz quiz);
}