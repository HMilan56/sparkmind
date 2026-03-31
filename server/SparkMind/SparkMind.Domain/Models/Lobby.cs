using SparkMind.Domain.Interfaces;

namespace SparkMind.Domain.Models;

public class Lobby
{
    private List<Player> _players = [];
    public IReadOnlyList<IPlayer> Players => _players;
    public int QuestionIndex { get; set; } = -1;
    public Question CurrentQuestion => Quiz.Questions[QuestionIndex];
    public string Code { get; } = Guid.NewGuid().ToString()[..5].ToUpper();
    public Host Host { get; }
    public Quiz Quiz { get; }
    public LobbyStateMachine StateMachine { get; }

    public Lobby(int userId, Quiz quiz)
    {
        Host = new Host { UserId = userId };
        Quiz = quiz;
        StateMachine = new LobbyStateMachine(IsGameOver);
    }

    private bool IsGameOver() => QuestionIndex >= Quiz.Questions.Count - 1;

    public void OnStateChanged(LobbyState oldState, LobbyState newState)
    {
        if (newState == LobbyState.QuestionPreview)
            QuestionIndex++;
    }

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
        var p = _players.FirstOrDefault(p => p.Name == answer);
    }

    public void RequestNextStep()
    {
        var (oldState, newState) = StateMachine.Advance();
        
        if (oldState == newState)
            return;
        
        if (newState == LobbyState.QuestionPreview)
            QuestionIndex++;
    }

    public Dictionary<string, int> GetAnswerStatistics()
    {
        return _players.GroupBy(p => p.SubmittedAnswer)
            .ToDictionary(g => g.Key, g => g.Count());
    }
}