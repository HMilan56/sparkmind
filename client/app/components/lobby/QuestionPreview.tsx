import { Container, Typography } from "@mui/material";

export type QuestionPreviewProps = {
    text: string;
    number: number;
}

export function QuestionPreview({text, number}: QuestionPreviewProps) {
    return (
        <Container maxWidth="xl">
            <Typography variant="h2">{text}</Typography>
        </Container>
    );
}