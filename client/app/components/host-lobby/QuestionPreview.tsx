import { Container, Stack, Typography } from "@mui/material";
import { Clock } from "../Clock";

export type QuestionPreviewProps = {
    text: string;
    number: number;
    deadline?: number;
}

export function QuestionPreview({ text, number, deadline }: QuestionPreviewProps) {
    return (
        <Container maxWidth="xl">
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="h2">{text}</Typography>
                { deadline && <Clock deadline={deadline}/>}
            </Stack>
        </Container>
    );
}