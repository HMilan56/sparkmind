import { Stack, Typography } from "@mui/material";
import { QuestionEditor } from "./QuestionEditor";


export function Questions() {
    return (
        <>
            <Typography variant="h4" fontWeight={600}>Questions</Typography>
            <Stack spacing={1}>
                <QuestionEditor />
                <QuestionEditor />
                <QuestionEditor />
                <QuestionEditor />
            </Stack>
        </>
    )
}