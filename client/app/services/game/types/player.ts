import type { QuestionPreviewDto } from "./global";

export type PlayerUpdateDto =
    | { state: "WaitingForStart", payload: null }
    | { state: "QuestionPreview", payload: QuestionPreviewDto, deadline: number }
    | { state: "QuestionActive", payload: QuestionActiveDto, deadline: number }
    | { state: "QuestionFinished", payload: null }
    | { state: "GameOver", payload: null }

export type QuestionActiveDto = {
    text: string;
}