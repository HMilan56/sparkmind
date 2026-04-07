import type { QuestionActiveDto, QuestionFinishedDto } from "./types/host";


export const mockQuestionActiveDto: QuestionActiveDto = {
    text: "This is a question?",
    answers: [
        { id: 1, text: "Answer1" },
        { id: 2, text: "Answer2" },
        { id: 3, text: "Answer3" },
        { id: 4, text: "Answer4" },
    ]
};

export const mockQuestionFinishedDto: QuestionFinishedDto = {
    ...mockQuestionActiveDto,
    correctAnswer: "Answer1",
    answerStatistics: [
        { answer: "Answer1", count: 50 },
        { answer: "Answer2", count: 2 },
        { answer: "Answer3", count: 8 },
        { answer: "Answer4", count: 5 },
    ]
};