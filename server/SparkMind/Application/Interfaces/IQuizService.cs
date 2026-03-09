using Application.DTOs;

namespace Application.Interfaces;

public interface IQuizService
{
    Task<QuizDataDto?> GetQuizByIdAsync(int id);
    Task<IEnumerable<QuizHeaderDto>> GetAllQuizHeadersAsync(int userId);
}