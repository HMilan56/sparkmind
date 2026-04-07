import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material"

export type WaitingRoomProps = {
    players: string[];
    code: string;
    onStartGame: () => void
};

export function WaitingRoom({players, code, onStartGame}: WaitingRoomProps) {
    return (
        <Container maxWidth="xl">
            <Grid container spacing={2} sx={{ mt: 4 }}>
                <Grid size={{ xs: 6 }}>
                    <Paper sx={{ p: 4, textAlign: "center", bgcolor: "#a2a2a2" }}>
                        <Typography variant="h4">
                            {players.length} players waiting
                        </Typography>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 6 }}>
                    <Paper sx={{ p: 4, textAlign: "center", bgcolor: "#444", color: "#fff" }}>
                        <Typography variant="h4">
                            Join with code: {code}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Box sx={{ my: 8 }}>
                <Grid container spacing={1}>
                    {players.map((playerName, index) => (
                        <Grid key={index}>
                            <Paper sx={{ p: 2, bgcolor: "#444", color: "#fff", minWidth: 100 }}>
                                <Typography>{playerName}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                <Button variant="contained" color="inherit" size="large">
                    CANCEL
                </Button>
                <Button variant="contained" color="primary" size="large" disabled={players.length === 0} onClick={() => { onStartGame() }}>
                    START QUIZ
                </Button>
            </Box>
        </Container>
    )
}