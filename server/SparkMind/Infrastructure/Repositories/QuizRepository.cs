using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class QuizRepository(AppDbContext context) : IQuizRepository
{
    public async Task<Quiz?> GetQuizByIdAsync(int id)
    {
        return await context.Quizzes
            .Include(q => q.Questions)
            .ThenInclude(ques => ques.Answers)
            .Include(q => q.Author)
            .SingleOrDefaultAsync(q => q.Id == id);
    }
}