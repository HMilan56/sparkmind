import { Box, Typography, Fade, LinearProgress, Paper } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";

export type AnswerBoxProps = {
    answer: string;
    isCorrect: boolean;
    percentage: number;
    showStatistics: boolean;
    index: number;
    color: "error" | "primary" | "warning" | "success";
};

export function AnswerBox({
    answer,
    isCorrect,
    percentage,
    showStatistics,
    index,
    color
}: AnswerBoxProps) {
    const [runAnimations, setRunAnimations] = useState(false);

    useEffect(() => {
        if (showStatistics) {
            const id = setTimeout(() => setRunAnimations(true), 200);
            return () => clearTimeout(id);
        } else {
            setRunAnimations(false);
        }
    }, [showStatistics]);

    const displayPercentage = runAnimations ? percentage : 0;

    const getBorderColor = () => {
        if (!showStatistics) return `${color}.main`;
        return isCorrect ? "success.main" : "divider";
    };

    const getShadow = (theme: any) => {
        if (showStatistics) return "none";
        return `0 0 15px ${theme.palette[color].main}`;
    };

    return (
        <Paper
            elevation={0}
            sx={{
                position: "relative",
                minHeight: "220px",
                width: "100%",
                borderRadius: 4,
                border: "3px solid",
                borderColor: getBorderColor(),
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
                overflow: "hidden",
                transition: "all 0.4s ease-in-out",
                boxShadow: (theme) => getShadow(theme),
                bgcolor: "background.paper"
            }}
        >
            {showStatistics && (
                <LinearProgress
                    variant="determinate"
                    value={displayPercentage}
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        bgcolor: "transparent",
                        zIndex: 0,
                        "& .MuiLinearProgress-bar": {
                            bgcolor: isCorrect ? "success.main" : "grey.300",
                            opacity: 0.1,
                            transition: "transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)"
                        }
                    }}
                />
            )}

            <Box sx={{
                zIndex: 1,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>

                {runAnimations && isCorrect && (
                    <Fade in={true}>
                        <CheckCircleIcon sx={{ fontSize: "2.5rem", color: "success.main", mb: 0.5 }} />
                    </Fade>
                )}

                <Typography variant="h6" sx={{
                    fontWeight: "bold",
                    lineHeight: 1.2,
                    color: "text.primary"
                }}>
                    {answer}
                </Typography>
                
                <Typography variant="caption" sx={{
                    opacity: showStatistics ? 0.2 : 0.5,
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    mb: 1
                }}>
                    #{index + 1}
                </Typography>

                <Fade in={runAnimations} timeout={600}>
                    <Box sx={{ mt: 1 }}>
                        <Typography variant="h4" sx={{
                            fontWeight: "900",
                            color: isCorrect ? "success.main" : "text.secondary"
                        }}>
                            {percentage}%
                        </Typography>
                    </Box>
                </Fade>
            </Box>
        </Paper>
    );
}