using SparkMind.Application.DTOs.Game;
using SparkMind.Domain.Models;

namespace SparkMind.Application.Factories;

public static class LobbyMessageFactory
{
    public static object CreatePayload(Lobby lobby)
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
                lobby.CurrentQuestion.Answers.First(a => a.IsCorrect).Text,
                lobby.GetAnswerStatistics()
            ),
            _ => new { Message = "Transitioning..." }
        };
    }
}