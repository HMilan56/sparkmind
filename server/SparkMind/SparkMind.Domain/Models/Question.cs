namespace SparkMind.Domain.Models;

public class Question
{
    public int Id { get; set; }
    public string Text { get; set; }
    public QuestionSettings Settings { get; set; } = new();
    public Quiz Quiz { get; set; }
    public List<Answer> Answers { get; set; } = [];
}