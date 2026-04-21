import { Button, Container, Grid, Typography } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";

type Option = {
    id: number;
    color: "error" | "primary" | "warning" | "success";
};

const options: Option[] = [
    { id: 1, color: "error" },
    { id: 2, color: "primary" },
    { id: 3, color: "warning" },
    { id: 4, color: "success" },
];

export type AnswerGridProps = {
    onAnswer: (id: number) => void
}

export function AnswerGrid({ onAnswer }: AnswerGridProps) {
    return (
        <Container>
            <Grid container spacing={4} sx={{ mb: 2 }}>
                {
                    options.map((opt, index) => (
                        <Grid key={opt.id} size={{ xs: 6 }}>
                            <Button
                                onClick={() => onAnswer(opt.id)}
                                fullWidth
                                variant="outlined"
                                color={opt.color}
                                sx={{
                                    minHeight: "150px",
                                    height: "100%",
                                    borderRadius: 4,
                                    borderWidth: 3,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    p: 2,
                                    gap: 0.5,
                                    transition: "0.5s",
                                    boxShadow: (theme) => `0 0 15px ${theme.palette[opt.color].main}`,
                                    "&:hover": { borderWidth: 3, boxShadow: (theme) => `0 0 25px ${theme.palette[opt.color].main}` }
                                }}
                            >
                                <BoltIcon sx={{ fontSize: "6rem" }} />

                                <Typography variant="caption" sx={{ opacity: 0.6, fontWeight: "bold", fontSize: "1.5rem" }}>
                                    #{index + 1}
                                </Typography>
                            </Button>
                        </Grid>
                    ))
                }
            </Grid >
        </Container>

    );
}