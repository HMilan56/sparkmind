using Domain.Models;

namespace Domain.Interfaces;

public interface IQuizRepository
{
    Task<Quiz?> GetQuizByIdAsync(int id);
}