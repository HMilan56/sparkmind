namespace SparkMind.Domain.Models;

public class Lobby
{
    public List<Player> Players { get; set; } = [];
    public int QuestionIndex { get; set; } = -1;
    public Question CurrentQuestion => Quiz.Questions[QuestionIndex];
    public string Code { get; } = Guid.NewGuid().ToString()[..5].ToUpper();
    public Host Host { get; }
    public Quiz Quiz { get; }
    public LobbyStateMachine StateMachine { get; }
    public event Action? NotifyStateChanged;

    public Lobby(int userId, Quiz quiz)
    {
        Host = new Host { UserId = userId };
        Quiz = quiz;
        StateMachine = new LobbyStateMachine(IsGameOver);
        StateMachine.OnStateChanged += OnStateChanged;
    }

    private bool IsGameOver() => QuestionIndex >= Quiz.Questions.Count - 1;

    public void OnStateChanged()
    {
        switch (StateMachine.State)
        {
            case LobbyState.QuestionPreview:
                QuestionIndex++;
                break;
            case LobbyState.QuestionActive:
                break;
            case LobbyState.QuestionFinished:
                break;
            case LobbyState.GameOver:
                break;
        }
        
        NotifyStateChanged?.Invoke();
    }

    public Player AddOrGetPlayer(string name)
    {
        var player = Players.FirstOrDefault(p => p.Name == name);
        if (player != null)
            return player;
        
        player = new Player { Name = name, Lobby = this};
        Players.Add(player);
        
        return player;
    }

    public void RemovePlayer(Player player)
    {
        Players.Remove(player);
    }

    public void RequestNextStep()
    {
        StateMachine.Advance();
    }

    public Dictionary<string, int> GetAnswerStatistics()
    {
        return Players.GroupBy(p => p.SubmittedAnswer).ToDictionary(g => g.Key, g => g.Count());
    }
}