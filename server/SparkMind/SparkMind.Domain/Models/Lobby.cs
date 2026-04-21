using SparkMind.Domain.Interfaces;

namespace SparkMind.Domain.Models;

public class Lobby
{
    private List<Player> _players = [];
    private DateTimeOffset? _questionDeadline = null;
    public IReadOnlyList<IPlayer> Players => _players;
    public List<string> OnlinePlayers => _players
        .Where(p => p.IsOnline)
        .Select(p => p.Name)
        .ToList();
    public int QuestionIndex { get; private set; } = 0;
    public Question CurrentQuestion => Quiz.Questions[QuestionIndex];
    public string Code { get; } = Guid.NewGuid().ToString()[..5].ToUpper();
    public Host Host { get; }
    public Quiz Quiz { get; }
    private bool IsGameOver => QuestionIndex >= Quiz.Questions.Count - 1;
    public LobbyStateMachine StateMachine { get; }
    
    public Lobby(int userId, Quiz quiz)
    {
        Host = new Host { UserId = userId, lobby = this};
        Quiz = quiz;
        StateMachine = new LobbyStateMachine();
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
        var sortedPlayers = _players.OrderByDescending(p => p.SubmitTime)
            .Select((p, i) => (p, i));
        
        var correctAnswer = CurrentQuestion.Answers.First(a => a.IsCorrect).Text;
        var deadline = _questionDeadline!.Value.ToUnixTimeMilliseconds();
        
        foreach (var (player, index) in sortedPlayers)
        {
            if (player.SubmittedAnswer == correctAnswer)
            {
                player.Streak = Math.Min(player.Streak + 1, 3);

                const int baseScore = 100;
                
                var streakFactor = player.Streak >= 2 ? player.Streak * 50 : 0;
                var speedFactor = (int) Math.Floor((deadline - player.SubmitTime) * 100.0 / deadline);
                var orderFactor = Math.Max(5 - index, 0) * 50;
                
                var delta = baseScore + streakFactor + speedFactor + orderFactor;
                player.Score += delta;
                player.Delta = delta;
                
                Console.WriteLine("Streak Factor: " + streakFactor);
                Console.WriteLine("Speed Factor: " + speedFactor);
                Console.WriteLine("Order Factor: " + orderFactor);
                Console.WriteLine("Total Score: " + player.Score);
            }
            else
            {
                player.Streak = 0;
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
        var (oldState, newState) = StateMachine.Advance(BuildContext());

        if (oldState == newState)
            return;

        switch (oldState, newState)
        {
            case (LobbyState.QuestionFinished, LobbyState.QuestionPreview):
                ClearAnswers();
                QuestionIndex++; 
                break;

            case (LobbyState.QuestionPreview, LobbyState.QuestionActive):
                _questionDeadline = StateMachine.AutoAdvanceTimestamp;
                break;

            case (LobbyState.QuestionActive, LobbyState.QuestionFinished):
                EvaluateAnswers();
                break;
        }
    }

    private AdvanceContext BuildContext()
    {
        // Question index increment only happens after state transition so we have to look ahead in QuestionFinished
        // state to build the context on the (intended) upcoming question
        var lookAhead = StateMachine.State == LobbyState.QuestionFinished && !IsGameOver;
        var currQuestion = lookAhead ? Quiz.Questions[QuestionIndex + 1] : CurrentQuestion;
        
        var previewDuration = TimeSpan.FromSeconds(currQuestion.Settings.PreviewTime);
        var questionDuration = TimeSpan.FromSeconds(currQuestion.Settings.TimeLimit);
        
        return new AdvanceContext(previewDuration, questionDuration, IsGameOver);
    }

    public Dictionary<string, int> GetAnswerStatistics()
    {
        return _players.GroupBy(p => p.SubmittedAnswer)
            .ToDictionary(g => g.Key, g => g.Count());
    }
}