namespace SparkMind.Domain.Models;

public class LobbyStateMachine()
{
    public LobbyState State { get; private set; } = LobbyState.WaitingForStart;

    public DateTimeOffset? AutoAdvanceTimestamp { get; private set; }
    
    public (LobbyState oldState, LobbyState newState) Advance(AdvanceContext context)
    {
        var oldState = State;
        
        switch (State)
        {
            case LobbyState.WaitingForStart:
                SwitchToAndScheduleAdvance(LobbyState.QuestionPreview, context.PreviewDuration);
                break;
            
            case LobbyState.QuestionPreview:
                SwitchToAndScheduleAdvance(LobbyState.QuestionActive, context.QuestionDuration);
                break;

            case LobbyState.QuestionActive:
                State = LobbyState.QuestionFinished;
                break;

            case LobbyState.QuestionFinished:
                if (context.IsLastQuestion)
                {
                    State = LobbyState.GameOver;
                } 
                else
                {
                    SwitchToAndScheduleAdvance(LobbyState.QuestionPreview, context.PreviewDuration);
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

public record AdvanceContext(
    TimeSpan PreviewDuration,
    TimeSpan QuestionDuration,
    bool IsLastQuestion
);