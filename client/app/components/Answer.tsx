import { Checkbox, IconButton, Stack, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import type { QuizData } from "~/services/quiz-service/types";

export type AnswerProps = {
    questionIndex: number;
    answerIndex: number;
    onRemove: () => void;
}

export function Answer({ questionIndex, answerIndex, onRemove }: AnswerProps) {
    const { control } = useFormContext<QuizData>();

    return (
        <Stack width={"100%"} direction={"row"}>
            <Controller
                name={`questions.${questionIndex}.answers.${answerIndex}.text`}
                control={control}
                render={({ field }) => (
                    <TextField {...field} label="Answer" fullWidth size="small" />
                )}
            />
            <Controller
                name={`questions.${questionIndex}.answers.${answerIndex}.isCorrect`}
                control={control}
                render={({ field }) => (
                    <Checkbox {...field} checked={field.value} color="success" />
                )}
            />
            <IconButton onClick={onRemove}>
                <DeleteForeverIcon color="error"/>
            </IconButton>
        </Stack>
    )
}