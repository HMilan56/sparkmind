import { Box, Typography, Fade, Paper } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

type QuestionResultProps = {
    isCorrect: boolean;
};

export function QuestionResult({ isCorrect }: QuestionResultProps) {
    const color = isCorrect ? "success.main" : "error.main";
    const Icon = isCorrect ? CheckCircleOutlineIcon : HighlightOffIcon;
    const message = isCorrect ? "Correct Answer" : "Incorrect Answer";

    return (
        <Fade in={true} timeout={400}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1, width: "100%", my: 2 }}>
                <Paper
                    elevation={0}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: { xs: 1.5, sm: 2 },
                        px: { xs: 3, sm: 5 },
                        py: { xs: 1.5, sm: 2.5 },
                        borderRadius: 10,
                        border: "3px solid",
                        borderColor: color,
                        bgcolor: "background.paper",
                        boxShadow: (theme) => `0 0 20px ${theme.palette[isCorrect ? "success" : "error"].main}44`,
                        transition: "all 0.3s ease-in-out",
                    }}
                >
                    <Icon sx={{
                        fontSize: { xs: "2rem", sm: "3rem" },
                        color: color
                    }} />

                    <Typography
                        variant="h4"
                        sx={{
                            color: color,
                            fontWeight: 900,
                            fontSize: { xs: "1.2rem", sm: "2rem" },
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                            whiteSpace: "nowrap"
                        }}
                    >
                        {message}
                    </Typography>
                </Paper>
            </Box>
        </Fade>
    );
}