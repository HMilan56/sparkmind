import { Container, Grid, Paper, Typography } from "@mui/material";
import type { QuestionActiveDto } from "~/services/game/game.types";

export type QuestionActiveProps = {
    questionActiveDto: QuestionActiveDto
};

export function QuestionActive({ questionActiveDto }: QuestionActiveProps) {
    const { text, answers } = questionActiveDto;

    return (
        <Container maxWidth={"lg"}>
            <Grid container spacing={2} mt={2}>
                <Grid size={12}>
                    <Paper variant="outlined" sx={{ p: 6, textAlign: 'center' }}>
                        <Typography variant="h4">{text}</Typography>
                    </Paper>
                </Grid>
                {answers.map(answer =>
                    <AnswerBox key={answer.id} answer={answer.text} />
                )}
            </Grid>
        </Container>
    );
}

function AnswerBox({ answer }: { answer: string }) {
    return (
        <Grid size={6}>
            <Paper sx={{ p: 5 }}>
                <Typography>{answer}</Typography>
            </Paper>
        </Grid>
    )
}