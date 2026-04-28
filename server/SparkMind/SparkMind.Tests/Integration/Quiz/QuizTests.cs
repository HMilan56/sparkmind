using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SparkMind.Application.DTOs;
using SparkMind.Domain.Models;
using SparkMind.Infrastructure.Data;
using SparkMind.Tests.Integration.Fixtures;

namespace SparkMind.Tests.Integration.Quiz;

public class QuizTests(SparkMindFactory factory) : IClassFixture<SparkMindFactory>
{
    private HttpClient Client => factory.Client;
    
    [Fact]
    public async Task CreateQuiz_ValidData_PersistsInDatabase()
    {
        // Arrange
        await factory.AuthenticateAsync();

        var newQuiz = new QuizDataDto(
            Id: 0,
            Title: "General Science Quiz",
            Desc: "A collection of basic science questions for students.",
            Mode: QuizMode.MODE1,
            Settings: new QuizSettingsDto(ShuffleQuestions: true, RandomizePlayerNames: false),
            Questions:
            [
                new QuestionDataDto(
                    Id: 0,
                    Text: "Which planet is known as the Red Planet?",
                    Answers:
                    [
                        new AnswerDataDto(0, "Mars", true),
                        new AnswerDataDto(0, "Jupiter", false),
                        new AnswerDataDto(0, "Venus", false)
                    ],
                    Settings: new QuestionSettingsDto(PreviewTime: 5, TimeLimit: 20)
                )
            ]
        );

        // Act
        var response = await Client.PostAsJsonAsync("/api/quiz/create", newQuiz);

        // Assert
        response.StatusCode.Should().Be(System.Net.HttpStatusCode.Created);
    
        using var scope = factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    
        var savedQuiz = await db.Quizzes
            .Include(q => q.Questions)
            .ThenInclude(ques => ques.Answers)
            .FirstOrDefaultAsync(q => q.Title == "General Science Quiz");

        savedQuiz.Should().NotBeNull();
        savedQuiz!.Title.Should().Be(newQuiz.Title);
        savedQuiz.Description.Should().Be(newQuiz.Desc);
    
        savedQuiz.Questions.Should().HaveCount(1);
    
        var firstQuestion = savedQuiz.Questions.First();
        firstQuestion.Text.Should().Be("Which planet is known as the Red Planet?");
        firstQuestion.Answers.Should().HaveCount(3);
    
        firstQuestion.Answers.Should().ContainSingle(a => a.IsCorrect && a.Text == "Mars");
    }
    
    [Fact]
    public async Task GetQuizById_OtherUsersQuiz_ReturnsNotFound()
    {
        // Arrange
        await factory.AuthenticateAsync();
        int strangersQuizId;

        using (var scope = factory.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            var stranger = new User 
            { 
                UserName = "stranger", 
                Email = "stranger@test.com" 
            };
            db.Users.Add(stranger);

            var strangersQuiz = new Domain.Models.Quiz 
            { 
                Title = "Stranger's Private Quiz", 
                Author = stranger,
                Description = "Sensitive Information",
                Questions = []
            };
            db.Quizzes.Add(strangersQuiz);
        
            await db.SaveChangesAsync();
            strangersQuizId = strangersQuiz.Id;
        }

        // Act
        var response = await Client.GetAsync($"/api/quiz/{strangersQuizId}");

        // Assert
        response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task GetLibrary_ReturnsOnlyOwnedQuizzes()
    {
        // Arrange
        await factory.AuthenticateAsync();
    
        using (var scope = factory.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        
            var currentUser = await db.Users.FirstAsync(u => u.Email == "test@test.com");

            var otherUser = new User { UserName = "other", Email = "other@test.com" };
            db.Users.Add(otherUser);

            db.Quizzes.AddRange(
                new Domain.Models.Quiz { Title = "My First Quiz", Author = currentUser },
                new Domain.Models.Quiz { Title = "My Second Quiz", Author = currentUser }
            );

            db.Quizzes.Add(
                new Domain.Models.Quiz { Title = "Other User Quiz", Author = otherUser }
            );

            await db.SaveChangesAsync();
        }

        // Act
        var response = await Client.GetAsync("/api/quiz/library");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var library = await response.Content.ReadFromJsonAsync<List<QuizHeaderDto>>();

        library.Should().HaveCount(2);
        library.Should().OnlyContain(q => q.Title.StartsWith("My "));
        library.Should().NotContain(q => q.Title == "Other User Quiz");
    }
    
    [Fact]
    public async Task DeleteQuiz_RemovesAssociatedData()
    {
        // Arrange
        await factory.AuthenticateAsync();
        
        int quizId;
        int questionId;
        int answerId;

        using (var scope = factory.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            
            var currentUser = await db.Users.FirstAsync(u => u.Email == "test@test.com");

            var quiz = new Domain.Models.Quiz 
            { 
                Title = "Cleanup Test Quiz",
                Author = currentUser,
                Questions = 
                [ 
                    new Question 
                    { 
                        Text = "To be deleted", 
                        Answers = [ new Answer { Text = "Deleted answer", IsCorrect = true } ] 
                    } 
                ]
            };
            
            db.Quizzes.Add(quiz);
            await db.SaveChangesAsync();
            
            quizId = quiz.Id;
            questionId = quiz.Questions.First().Id;
            answerId = quiz.Questions.First().Answers.First().Id;
        }

        // Act
        var response = await Client.DeleteAsync($"/api/quiz/{quizId}");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NoContent);

        using (var scope = factory.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            
            var deletedQuiz = await db.Quizzes.FindAsync(quizId);
            deletedQuiz.Should().BeNull();

            var deletedQuestion = await db.Questions.FindAsync(questionId);
            deletedQuestion.Should().BeNull();

            var deletedAnswer = await db.Answers.FindAsync(answerId);
            deletedAnswer.Should().BeNull();
        }
    }
}