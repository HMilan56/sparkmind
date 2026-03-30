using SparkMind.Domain.Interfaces;
using SparkMind.Domain.Models;
using Microsoft.EntityFrameworkCore;
using SparkMind.Infrastructure.Data;

namespace SparkMind.Infrastructure.Repositories;

public class QuizRepository(AppDbContext context) : IQuizRepository
{
    public async Task<Quiz?> GetByIdAsync(int id)
    {
        return await context.Quizzes
            .AsNoTracking()
            .Include(q => q.Questions)
            .ThenInclude(ques => ques.Answers)
            .Include(q => q.Author)
            .SingleOrDefaultAsync(q => q.Id == id);
    }

    public async Task<IEnumerable<Quiz>> GetLibraryAsync(int userId)
    {
        return await context.Quizzes
            .Where(q => q.Author.Id == userId)
            .ToListAsync();
    }

    public async Task DeleteAsync(int id)
    {
         await context.Quizzes
            .Where(q => q.Id == id)
            .ExecuteDeleteAsync();
    }

    public async Task<Quiz> CreateAsync(int userId)
    {
        var user = await context.Users.SingleAsync(q => q.Id == userId);
        var settings = new QuizSettings
        {
            RandomizePlayerNames = false,
            ShuffleQuestions = false
        };

        var newQuiz = new Quiz
        {
            Author = user,
            Title = "",
            Description = "",
            Mode = QuizMode.MODE1,
            Questions = [],
            Settings = settings
        };
        
        context.Quizzes.Add(newQuiz);
        await context.SaveChangesAsync();
        
        return newQuiz;
    }

    public async Task UpdateAsync(Quiz updatedQuiz)
    {
        var quiz = await context.Quizzes.SingleAsync(q => q.Id == updatedQuiz.Id);
        context.Entry(quiz).CurrentValues.SetValues(updatedQuiz);
        await context.SaveChangesAsync();
    }
}