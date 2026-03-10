using Domain.Models;

namespace Domain.Interfaces;

public interface IQuizRepository
{
    Task<Quiz?> GetByIdAsync(int id);
    Task<IEnumerable<Quiz>> GetLibraryAsync(int userId);
    Task DeleteAsync(int id);
    Task<Quiz> CreateAsync(int id);
    Task UpdateAsync(Quiz quiz);
}