import { Button, Stack, Typography } from "@mui/material";
import { QuestionEditor } from "./QuestionEditor";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { QuizData } from "~/services/quizService";


export function Questions() {
    const { control } = useFormContext<QuizData>();
    const { fields, append } = useFieldArray({
        control,
        name: "questions"
    })

    function addQuestion() {
        append({
            id: 0,
            text: "",
            answers: [
                {
                    id: 0,
                    answer: "",
                    correct: false
                }
            ],
            settings: {
                setting1: "",
                setting2: ""
            },
        })
    }

    return (
        <>
            <Typography variant="h4" fontWeight={600}>Questions</Typography>
            <Stack spacing={2}>
                {fields.map((field, index) =>
                    <QuestionEditor key={field.id} index={index}/>
                )}
                <Button color="inherit" variant="contained" sx={{ alignSelf: "flex-start" }} onClick={addQuestion}>Add question</Button>
            </Stack>
        </>
    )
}