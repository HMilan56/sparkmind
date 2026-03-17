using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using SparkMind.Application.DTOs;
using SparkMind.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace SparkMind.WebApi.Controllers;

[Authorize]
[ApiController]
[Route("api/quiz")]
public class QuizController(IQuizService quizService) : ControllerBase
{
    private int GetCurrentUserId()
    {
        var idClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return string.IsNullOrEmpty(idClaim) ? throw new UnauthorizedAccessException() : int.Parse(idClaim);
    }
    
    [HttpGet("{quizId}")]
    public async Task<IActionResult> GetQuizByIdAsync(int quizId)
    {
        var userId = GetCurrentUserId();
        var quiz = await quizService.GetByIdAsync(userId, quizId);
        return quiz == null ? NotFound() : Ok(quiz);
    }

    [HttpGet("library")]
    public async Task<IActionResult> GetLibraryAsync()
    {
        var userId = GetCurrentUserId();
        var library = await quizService.GetLibraryAsync(userId);
        return Ok(library);
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateQuizAsync()
    {
        var userId = GetCurrentUserId();
        var newQuiz = await quizService.CreateAsync(userId);
        return Ok(newQuiz);
    }

    [HttpPut("update")]
    public async Task<IActionResult> UpdateQuizAsync([FromBody] QuizDataDto quiz)
    {
        var userId = GetCurrentUserId();
        await quizService.UpdateAsync(userId, quiz);
        return NoContent();
    }

    [HttpDelete("{quizId}")]
    public async Task<IActionResult> DeleteQuizAsync(int quizId)
    {
        var userId = GetCurrentUserId();
        await quizService.DeleteAsync(userId, quizId);
        return NoContent();
    }
}