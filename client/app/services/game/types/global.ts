// --- Global types
export type LobbyState = "WaitingForStart" | "QuestionPreview" | "QuestionActive" | "QuestionFinished" | "GameOver"


// --- Player types
export type QuestionPreviewDto = {
    number: number;
    text: string;
}