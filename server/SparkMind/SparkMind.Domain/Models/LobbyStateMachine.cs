namespace SparkMind.Domain.Models;

public class LobbyStateMachine(Func<bool> isGameOver)
{
    public LobbyState State { get; private set; } = LobbyState.WaitingForStart;

    public DateTimeOffset? AutoAdvanceTimestamp { get; private set; }
    
    public (LobbyState oldState, LobbyState newState) Advance()
    {
        var oldState = State;
        
        switch (State)
        {
            case LobbyState.WaitingForStart:
                SwitchToAndScheduleAdvance(LobbyState.QuestionPreview, TimeSpan.FromSeconds(5));
                break;
            
            case LobbyState.QuestionPreview:
                SwitchToAndScheduleAdvance(LobbyState.QuestionActive, TimeSpan.FromSeconds(20));
                break;

            case LobbyState.QuestionActive:
                State = LobbyState.QuestionFinished;
                break;

            case LobbyState.QuestionFinished:
                if (isGameOver())
                {
                    State = LobbyState.GameOver;
                } 
                else
                {
                    SwitchToAndScheduleAdvance(LobbyState.QuestionPreview, TimeSpan.FromSeconds(5));
                }
                break;
            
            case LobbyState.GameOver:
                break;
        }

        var newState = State;
        return (oldState, newState);
    }

    private void SwitchToAndScheduleAdvance(LobbyState newState, TimeSpan timeToAdvance)
    {
        State = newState;
        AutoAdvanceTimestamp = DateTimeOffset.UtcNow.AddSeconds(timeToAdvance.TotalSeconds);
    }
    
    public void ClearAutoAdvance()
    {
        AutoAdvanceTimestamp = null;
    }
}