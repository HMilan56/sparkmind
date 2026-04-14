using SparkMind.Domain.Interfaces;

namespace SparkMind.Domain.Models;

public class Lobby
{
    private List<Player> _players = [];
    public IReadOnlyList<IPlayer> Players => _players;
    public List<string> OnlinePlayers => _players
        .Where(p => p.IsOnline)
        .Select(p => p.Name)
        .ToList();
    public int QuestionIndex { get; private set; } = -1;
    public Question CurrentQuestion => Quiz.Questions[QuestionIndex];
    public string Code { get; } = Guid.NewGuid().ToString()[..5].ToUpper();
    public Host Host { get; }
    public Quiz Quiz { get; }
    public LobbyStateMachine StateMachine { get; }

    public Lobby(int userId, Quiz quiz)
    {
        Host = new Host { UserId = userId, lobby = this};
        Quiz = quiz;
        StateMachine = new LobbyStateMachine(IsGameOver);
    }

    private bool IsGameOver() => QuestionIndex >= Quiz.Questions.Count - 1;

    public IPlayer AddOrGetPlayer(string name)
    {
        var player = Players.FirstOrDefault(p => p.Name == name);
        if (player != null)
            return player;
        
        var newPlayer = new Player { Name = name, Lobby = this};
        _players.Add(newPlayer);
        
        return newPlayer;
    }

    public void RemovePlayer(IPlayer player)
    {
        _players.RemoveAll(p => p.Name == player.Name);
    }

    public void SubmitAnswer(IPlayer player, string answer)
    {
        if (StateMachine.State != LobbyState.QuestionActive)
            return;
        
        var p = _players.FirstOrDefault(p => p.Name == player.Name);
        if (p?.SubmittedAnswer == "")
        {
            p.SubmittedAnswer = answer;
        }
    }

    private void EvaluateAnswers()
    {
        foreach (var player in _players)
        {
            var correctAnswer = CurrentQuestion.Answers.First(a => a.IsCorrect).Text;
            if (player.SubmittedAnswer == correctAnswer)
            {
                const int delta = 100;
                player.Score += delta;
                player.Delta = delta;
            }
            else
            {
                player.Delta = 0;
            }
            
        }
    }

    private void ClearAnswers()
    {
        foreach (var player in _players)
        {
            player.SubmittedAnswer = "";
        }
    }

    public void RequestNextStep()
    {
        var (oldState, newState) = StateMachine.Advance();
        
        if (oldState == newState)
            return;

        switch (newState)
        {
            case LobbyState.QuestionFinished:
                EvaluateAnswers();
                break;
            case LobbyState.QuestionPreview:
                ClearAnswers();
                QuestionIndex++;
                break;
        }
    }

    public Dictionary<string, int> GetAnswerStatistics()
    {
        return _players.GroupBy(p => p.SubmittedAnswer)
            .ToDictionary(g => g.Key, g => g.Count());
    }
}