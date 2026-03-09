using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuizController(IQuizService quizService) : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<IActionResult> GetQuizByIdAsync(int id)
    {
        var quiz = await quizService.GetQuizByIdAsync(id);
        return quiz == null ? NotFound() : Ok(quiz);
    }
}