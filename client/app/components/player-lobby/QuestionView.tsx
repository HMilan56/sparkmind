import React from "react";
import { Container, Grid, Button, Typography, Box, Paper } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";

type Option = {
    id: number;
    color: "error" | "primary" | "warning" | "success";
};

export type AnswerButtonGridProps = {
    onAnswerClick: (id: number) => void;
};

export function QuestionView({ onAnswerClick }: AnswerButtonGridProps) {
    const options: Option[] = [
        { id: 1, color: "error" },
        { id: 2, color: "primary" },
        { id: 3, color: "warning" },
        { id: 4, color: "success" },
    ];

    return (
        <Container maxWidth="md" sx={{ height: "100%", display: "flex", flexDirection: "column", py: 2 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", mb: 5 }}>
                <Paper elevation={0} sx={{ p: 3, width: "100%", textAlign: "center", bgcolor: "background.paper", borderRadius: 4, border: "1px solid rgba(255,255,255,0.1)" }}>
                    <Typography variant="h5" fontWeight="800">N/A</Typography>
                </Paper>
            </Box>

            <Grid container spacing={4} sx={{ mb: 2 }}>
                {options.map((opt, index) => (
                    <Grid key={opt.id} size={{ xs: 6 }}>
                        <Button
                            onClick={() => onAnswerClick(opt.id)}
                            fullWidth
                            variant="outlined"
                            color={opt.color}
                            sx={{
                                minHeight: "300px",
                                height: "100%",
                                borderRadius: 4,
                                borderWidth: 3,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                p: 2,
                                gap: 0.5,
                                transition: "0.3s",
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
                ))}
            </Grid>
        </Container>
    );
}