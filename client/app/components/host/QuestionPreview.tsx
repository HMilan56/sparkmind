import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { ClockProgressBar } from "../ClockProgressBar";
import type { TimeContext } from "~/hooks/useCountdown";

export type QuestionPreviewProps = {
    text: string;
    number: number;
    timeContext: TimeContext
}

export function QuestionPreview({ text, number, timeContext }: QuestionPreviewProps) {
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
                    flexGrow: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 4,
                    mb: 4,
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
                            {text}
                        </Typography>
                        <ClockProgressBar timeContext={timeContext}/>
                    </Stack>
                </Paper>
            </Box>
        </Container>
    );
}