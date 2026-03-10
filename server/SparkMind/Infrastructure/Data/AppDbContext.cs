using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Quiz> Quizzes { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<Answer> Answers { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresEnum<QuizMode>();
        modelBuilder.Entity<Quiz>(builder =>
        {
            builder.HasKey(q => q.Id);
            builder.HasOne(q => q.Author)
                .WithMany(a => a.Quizzes);
            builder.OwnsOne(q => q.Settings, ownedNavBuilder =>
            {
                ownedNavBuilder.ToJson();
            });
        });

        modelBuilder.Entity<Question>(builder =>
        {
            builder.HasKey(q => q.Id);
            builder.HasOne(q => q.Quiz)
                .WithMany(q => q.Questions);
            builder.OwnsOne(q => q.Settings, ownedNavBuilder =>
            {
                ownedNavBuilder.ToJson();
            });
        });

        modelBuilder.Entity<Answer>(builder =>
        {
            builder.HasKey(q => q.Id);
            builder.HasOne(q => q.Question)
                .WithMany(q => q.Answers);
        });
    }
}