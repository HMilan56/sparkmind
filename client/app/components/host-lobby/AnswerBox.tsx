import { Grid, Box, LinearProgress, Typography, Fade } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";


export type AnswerBoxProps = {
    answer: string;
    isCorrect: boolean;
    percentage: number;
    showStatistics: boolean;
}

export function AnswerBox({ answer, isCorrect, percentage, showStatistics }: AnswerBoxProps) {
    const [runAnimations, setRunAnimations] = useState(false);
    
    useEffect(() => {
        if (showStatistics) {
            let id = setTimeout(() => setRunAnimations(true), 200);
            return () => clearTimeout(id);
        } else {
            setRunAnimations(false);
        }
    }, [showStatistics]);
    
    const isActiveSuccess = runAnimations && isCorrect;
    const displayPercentage = runAnimations ? percentage : 0;

    return (
        <Grid size={6}>
            <Box sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                height: 80,
                borderRadius: 1,
                overflow: "hidden",
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: isActiveSuccess ? "success.main" : "divider",
                transition: "all 0.5s ease-in-out"
            }}>

                <LinearProgress
                    variant="determinate"
                    value={displayPercentage}
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        bgcolor: "transparent",
                        "& .MuiLinearProgress-bar": {
                            bgcolor: isCorrect ? "success.main" : "error.main",
                            opacity: 0.2,
                            transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)"
                        }
                    }}
                />

                <Box sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 3,
                    zIndex: 2
                }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body1" sx={{ color: "text.primary" }}>
                            {answer}
                        </Typography>
                        {isActiveSuccess && (
                            <Fade in={runAnimations} timeout={500}>
                                <CheckCircleIcon sx={{ color: "success.main", fontSize: 20 }} />
                            </Fade>
                        )}
                    </Box>

                    <Fade in={runAnimations} timeout={600}>
                        <Box>
                            <Typography variant="h5" sx={{
                                fontWeight: "bold",
                                color: isCorrect ? "success.main" : "error.main"
                            }}>
                                {percentage}%
                            </Typography>
                        </Box>
                    </Fade>
                </Box>
            </Box>
        </Grid>
    );
}