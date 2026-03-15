using SparkMind.Application.DTOs;
using SparkMind.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace SparkMind.WebApi.Controllers;

[ApiController]
[Route("api")]
public class QuizController(IQuizService quizService) : ControllerBase
{
    [HttpGet("user/{userId}/quiz/{quizId}")]
    public async Task<IActionResult> GetQuizByIdAsync(int userId, int quizId)
    {
        var quiz = await quizService.GetByIdAsync(quizId);
        return quiz == null ? NotFound() : Ok(quiz);
    }

    [HttpGet("user/{userId}/library")]
    public async Task<IActionResult> GetQuizByUserIdAsync(int userId)
    {
        var library = await quizService.GetLibraryAsync(userId);
        return Ok(library);
    }

    [HttpPost("user/{userId}/create")]
    public async Task<IActionResult> CreateQuizAsync(int userId)
    {
        var newQuiz = await quizService.CreateAsync(userId);
        return Ok(newQuiz);
    }

    [HttpPut("user/{userId}/update")]
    public async Task<IActionResult> UpdateQuizAsync(int userId, [FromBody] QuizDataDto quiz)
    {
        await quizService.UpdateAsync(quiz);
        return NoContent();
    }

    [HttpDelete(("user/{userId}/quiz/{quizId}"))]
    public async Task<IActionResult> DeleteQuizAsync(int userId, int quizId)
    {
        await quizService.DeleteAsync(quizId);
        return NoContent();
    }
}