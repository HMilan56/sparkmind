namespace SparkMind.Domain.Models;

public class LobbyStateMachine(Func<bool> isGameOver)
{
    public LobbyState State
    {
        get;
        private set
        {
            if (value != State)
                OnStateChanged?.Invoke();
            field = value;
        }
    } = LobbyState.WaitingForStart;

    public DateTimeOffset? AutoAdvanceTimestamp { get; private set; } 
    public int QuestionIndex { get; private set; }
    
    public event Action? OnStateChanged;
    
    public void Advance()
    {
        AutoAdvanceTimestamp = null;
        
        switch (State)
        {
            case LobbyState.WaitingForStart:
                State = LobbyState.QuestionPreview;
                AutoAdvanceTimestamp = DateTimeOffset.UtcNow.AddSeconds(3);
                break;
            
            case LobbyState.QuestionPreview:
                State = LobbyState.QuestionActive;
                AutoAdvanceTimestamp = DateTimeOffset.UtcNow.AddSeconds(20);
                break;

            case LobbyState.QuestionActive:
                State = LobbyState.QuestionFinished;
                AutoAdvanceTimestamp = DateTimeOffset.UtcNow.AddSeconds(3);
                break;

            case LobbyState.QuestionFinished:
                State = isGameOver() ? LobbyState.GameOver : LobbyState.QuestionPreview;
                break;
            
            case LobbyState.GameOver:
                break;
        }
    }
}