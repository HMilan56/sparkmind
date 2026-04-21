import { Container, Typography, Box, Paper, Slide, Stack } from "@mui/material";
import { AnswerGrid } from "./AnswerGrid";
import { Clock } from "../clock/Clock";
import { ClockProgressBar } from "../clock/ClockProgressBar";
import type { TimeContext } from "~/hooks/useCountdown";

export type AnswerButtonGridProps = {
    questionText: string;
    timeContext: TimeContext;
    enableAnswers: boolean;
    onAnswer: (id: number) => void;
};

export function QuestionView({ questionText, timeContext, enableAnswers, onAnswer }: AnswerButtonGridProps) {
    return (
        <Container
            maxWidth="md"
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                py: 2,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexGrow: enableAnswers ? 0 : 1,
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 4,
                    mb: 4,
                    transition: "flex-grow 0.6s cubic-bezier(0.4, 0, 0.2, 1), margin 0.6s ease",
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        width: "100%",
                        textAlign: "center",
                        bgcolor: "background.paper",
                        borderRadius: 4,
                        border: "1px solid rgba(255,255,255,0.1)"
                    }}
                >
                    <Stack direction="column" px={3} justifyContent={"space-between"} alignItems={"center"} spacing={3}>
                        <Typography variant="h4" fontWeight="800">
                            {questionText}
                        </Typography>
                        { enableAnswers ? <Clock timeContext={timeContext}/> : <ClockProgressBar timeContext={timeContext}/> }
                    </Stack>
                </Paper>
            </Box>

            <Slide 
                direction="up" 
                in={enableAnswers} 
                mountOnEnter 
                unmountOnExit
                timeout={600}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <AnswerGrid onAnswer={onAnswer} />
                </Box>
            </Slide>
        </Container>
    );
}