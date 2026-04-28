using SparkMind.Application.DTOs.Game;
using SparkMind.Domain.Models;

namespace SparkMind.Application.Factories;

public static class LobbyMessageFactory
{
    private static List<PlayerStatDto> CreateLeaderBoard(Lobby lobby)
    {
        return lobby.Players.Select(p => new PlayerStatDto(
            p.Id,
            p.Name,
            p.SubmittedAnswer == lobby.CurrentQuestion.Answers.First(a => a.IsCorrect).Text,
            p.Score,
            p.Delta,
            p.Streak
        )).ToList();
    }
    
    public static object CreatePayloadForHost(Lobby lobby)
    {
        return lobby.StateMachine.State switch
        {
            LobbyState.QuestionPreview => new QuestionPreviewDto(
                lobby.QuestionIndex + 1,
                lobby.CurrentQuestion.Text
            ),
            LobbyState.QuestionActive => new QuestionActiveDto(
                lobby.CurrentQuestion.Text,
                lobby.CurrentQuestion.Answers.Select(a => new AnswerOptionDto(a.Id, a.Text)).ToList()
            ),
            LobbyState.QuestionFinished => new QuestionFinishedDto(
                lobby.CurrentQuestion.Text,
                lobby.CurrentQuestion.Answers.Select(a => new AnswerOptionDto(a.Id, a.Text)).ToList(),
                lobby.CurrentQuestion.Answers.First(a => a.IsCorrect).Text,
                lobby.GetAnswerStatistics().Select(stat => new AnswerStatDto(stat.Key, stat.Value)).ToList(),
                CreateLeaderBoard(lobby)
            ),
            LobbyState.GameOver => new
            {
                Leaderboard = CreateLeaderBoard(lobby)
            },
            _ => new { Message = "Transitioning..." }
        };
    }

    public static object CreatePayloadForPlayers(Lobby lobby)
    {
        return lobby.StateMachine.State switch
        {
            LobbyState.QuestionPreview => new QuestionPreviewDto(
                lobby.QuestionIndex + 1,
                lobby.CurrentQuestion.Text
            ),
            LobbyState.QuestionActive => new
            {
                lobby.CurrentQuestion.Text,
            },
            LobbyState.QuestionFinished => new
            {
                Leaderboard = CreateLeaderBoard(lobby)
            },
            LobbyState.GameOver => new
            {
                Leaderboard = CreateLeaderBoard(lobby)  
            },
            _ => new
            {
                Message = "Transitioning..."
            }
        };
    }
}