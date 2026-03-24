import { Container, Typography, Paper, Grid, Box, Button } from "@mui/material";
import { Topbar } from "~/components/Topbar";
import { useLobby } from "~/hooks/useLobby";

export default function HostLobby() {
    const lobby = useLobby();

    return (
        <>
            <Topbar title="Lobby"/>
            <Container maxWidth="xl">
                <Grid container spacing={2} sx={{ mt: 4 }}>
                    <Grid size={{xs: 6}}>
                        <Paper sx={{ p: 4, textAlign: "center", bgcolor: "#a2a2a2" }}>
                            <Typography variant="h4">
                                {lobby.players.length} players waiting
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{xs: 6}}>
                        <Paper sx={{ p: 4, textAlign: "center", bgcolor: "#444", color: "#fff" }}>
                            <Typography variant="h4">
                                Join with code: {lobby.code}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Box sx={{ my: 8 }}>
                    <Grid container spacing={1}>
                        {lobby.players.map((player, index) => (
                            <Grid key={index}>
                                <Paper sx={{ p: 2, bgcolor: "#444", color: "#fff", minWidth: 100 }}>
                                    <Typography>{player}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                    <Button variant="contained" color="inherit" size="large">
                        CANCEL
                    </Button>
                    <Button variant="contained" color="primary" size="large" disabled={lobby.players.length === 0} onClick={() => { lobby.startGame() }}>
                        START QUIZ
                    </Button>
                </Box>
            </Container>
        </>
    );
};