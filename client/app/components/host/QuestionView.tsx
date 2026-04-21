import { Box, Button, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import type { QuestionActiveDto, QuestionFinishedDto } from "~/services/game/types/host";
import { AnswerBox } from "./AnswerBox";
import { Clock } from "../clock/Clock";
import type { TimeContext } from "~/hooks/useCountdown";

function isFinished(data: QuestionActiveDto | QuestionFinishedDto): data is QuestionFinishedDto {
    return (data as QuestionFinishedDto).answerStatistics !== undefined;
}

export type QuestionViewProps = {
    data: QuestionActiveDto | QuestionFinishedDto;
    timeContext?: TimeContext;
    onClick: () => void;
}

const colorsInOrder: ("error" | "primary" | "warning" | "success")[] = ["error", "primary", "warning", "success"];

export function QuestionView({ data, timeContext, onClick }: QuestionViewProps) {
    const totalVotes = isFinished(data) ? data.answerStatistics.reduce((sum, stat) => sum + stat.count, 0) : 0;

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Grid container spacing={4} mt={2}>
                <Grid size={12}>
                    <Paper variant="outlined" sx={{ p: 6, textAlign: 'center' }}>
                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                            <Typography variant="h4">{data.text}</Typography>
                            { timeContext && <Clock timeContext={timeContext}/> }
                        </Stack>
                    </Paper>
                </Grid>

                {data.answers.map((answer, i) => {
                    const stat = isFinished(data) ? data.answerStatistics.find(stat => stat.answer === answer.text) : null;

                    const isCorrect = isFinished(data) ? answer.text === data.correctAnswer : false;
                    const targetPercentage = stat && totalVotes > 0 ? Math.round((stat.count / totalVotes) * 100) : 0;

                    return (
                        <Grid key={answer.id} size={{xs: 12, sm: 6}}>
                            <AnswerBox
                                index={i}
                                color={colorsInOrder[i]}
                                answer={answer.text}
                                isCorrect={isCorrect}
                                percentage={targetPercentage}
                                showStatistics={isFinished(data)}
                            />
                        </Grid>
                    );
                })}
                <Grid size={12}>
                    <Box display={"flex"} justifyContent={"flex-end"}>
                        {isFinished(data) && <Button variant="outlined" onClick={() => onClick()}>Next question</Button>}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}