using SparkMind.Domain.Models;

namespace SparkMind.Tests.Util;

public class QuizBuilder(string title, User author)
{
    private readonly Quiz _quiz = new()
    {
        Title = title,
        Author = author,
        Description = "Default Test Description",
        Mode = QuizMode.MODE1,
        Questions = []
    };

    public QuizBuilder WithTitle(string title)
    {
        _quiz.Title = title;
        return this;
    }

    public QuizBuilder WithDescription(string description)
    {
        _quiz.Description = description;
        return this;
    }

    public QuizBuilder WithMode(QuizMode mode)
    {
        _quiz.Mode = mode;
        return this;
    }

    public QuizBuilder WithSettings(Action<QuizSettings> configure)
    {
        configure(_quiz.Settings);
        return this;
    }

    public QuizBuilder AddQuestion(string text, Action<QuestionBuilder> configureQuestion)
    {
        var questionBuilder = new QuestionBuilder(text);
        configureQuestion(questionBuilder);
        _quiz.Questions.Add(questionBuilder.Build());
        return this;
    }

    public Quiz Build()
    {
        foreach (var q in _quiz.Questions)
        {
            q.Quiz = _quiz;
        }
        
        return  _quiz;
    }
}

public class QuestionBuilder(string text)
{
    private readonly Question _question = new Question
    {
        Text = text,
        Answers = []
    };

    public QuestionBuilder AddAnswer(string text, bool isCorrect)
    {
        _question.Answers.Add(new Answer { Text = text, IsCorrect = isCorrect });
        return this;
    }

    public QuestionBuilder WithSettings(Action<QuestionSettings> configure)
    {
        configure(_question.Settings);
        return this;
    }

    public Question Build()
    {
        foreach (var a in _question.Answers)
        {
            a.Question =  _question;
        }
        
        return _question;
    }
}