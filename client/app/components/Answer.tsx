import { Checkbox, Stack, TextField, useFormControl } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import type { QuizData } from "~/services/quizService";

export type AnswerProps = {
    questionIndex: number;
    answerIndex: number;
}

export function Answer({ questionIndex, answerIndex }: AnswerProps) {
    const { control } = useFormContext<QuizData>();

    return (
        <Stack width={"100%"} direction={"row"}>
            <Controller
                name={`questions.${questionIndex}.answers.${answerIndex}.answer`}
                control={control}
                render={({ field }) => (
                    <TextField {...field} label="Answer" fullWidth size="small" />
                )}
            />
            <Controller
                name={`questions.${questionIndex}.answers.${answerIndex}.correct`}
                control={control}
                render={({ field }) => (
                    <Checkbox {...field} checked={field.value} color="success" />
                )}
            />
        </Stack>
    )
}