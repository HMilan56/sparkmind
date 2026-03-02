import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { QuizCard } from "./QuizCard";

export function QuizGrid() {
    const demoCards = Array.from({ length: 10 }, (_, i) => <QuizCard key={i} />)

    return (
        <Grid
            container
            spacing={5}
        >
            {demoCards.map((card, index) => (
                <Grid
                    key={index}
                    size={{ xs: 12, sm: 6, md: 4 }}
                    display="flex"
                    justifyContent="center"
                    height={"400px"}
                >
                    {card}
                </Grid>
            ))}
        </Grid>
    );
}