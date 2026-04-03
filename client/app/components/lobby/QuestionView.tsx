import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import type { QuestionActiveDto, QuestionFinishedDto } from "~/services/game/game.types";
import { AnswerBox } from "./AnswerBox";

function isFinished(data: QuestionActiveDto | QuestionFinishedDto): data is QuestionFinishedDto {
    return (data as QuestionFinishedDto).answerStatistics !== undefined;
}

export type QuestionResultsProps = {
    data: QuestionActiveDto | QuestionFinishedDto;
    onNextQuestion: () => void;
}

export function QuestionView({ data, onNextQuestion }: QuestionResultsProps) {
    const totalVotes = isFinished(data) ? data.answerStatistics.reduce((sum, stat) => sum + stat.count, 0) : 0;

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Grid container spacing={2} mt={2}>
                <Grid size={12}>
                    <Paper variant="outlined" sx={{ p: 6, textAlign: 'center' }}>
                        <Typography variant="h4">{data.text}</Typography>
                    </Paper>
                </Grid>

                {data.answers.map((answer, i) => {
                    const stat = isFinished(data) ? data.answerStatistics.find(stat => stat.answer === answer.text) : null;

                    const isCorrect = isFinished(data) ? answer.text === data.correctAnswer : false;
                    const targetPercentage = stat && totalVotes > 0 ? Math.round((stat.count / totalVotes) * 100) : 0;

                    return (
                        <AnswerBox
                            key={answer.id}
                            answer={answer.text}
                            isCorrect={isCorrect}
                            percentage={targetPercentage}
                            showStatistics={isFinished(data)}
                        />
                    );
                })}
                <Grid size={12}>
                    <Box display={"flex"} justifyContent={"flex-end"}>
                        {isFinished(data) && <Button variant="outlined" onClick={() => onNextQuestion() }>Next question</Button>}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}