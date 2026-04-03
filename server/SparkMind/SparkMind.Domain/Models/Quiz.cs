namespace SparkMind.Domain.Models;

public class Quiz
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public QuizMode Mode { get; set; }
    public QuizSettings Settings { get; set; } =  new QuizSettings();
    public required User Author { get; set; }
    public List<Question> Questions { get; set; } = [];
}