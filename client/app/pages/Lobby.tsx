import { useEffect, useState } from "react";
import { Container, Typography, Paper, Grid, Box, Button } from "@mui/material";
import { useSignalR } from "~/contexts/SignalRContext";
import { Topbar } from "~/components/Topbar";

export default function HostLobby() {
    const { connection, isConnected } = useSignalR();
    const [lobbyCode, setLobbyCode] = useState<string>("");
    const [players, setPlayers] = useState<string[]>([]);

    useEffect(() => {
        if (!isConnected || !connection) return;

        connection.invoke<string>("CreateLobby")
            .then(code => setLobbyCode(code))
            .catch(err => console.error("Lobby error:", err));

        connection.on("PlayerJoined", (playerName: string) => {
            setPlayers(prev => [...prev, playerName]);
        });

        return () => { connection.off("PlayerJoined"); };
    }, [isConnected, connection]);

    return (
        <>
            <Topbar title="Lobby"/>
            <Container maxWidth="xl">
                <Grid container spacing={2} sx={{ mt: 4 }}>
                    <Grid size={{xs: 6}}>
                        <Paper sx={{ p: 4, textAlign: "center", bgcolor: "#a2a2a2" }}>
                            <Typography variant="h4">
                                {players.length} players waiting
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{xs: 6}}>
                        <Paper sx={{ p: 4, textAlign: "center", bgcolor: "#444", color: "#fff" }}>
                            <Typography variant="h4">
                                Join with code: {lobbyCode}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Box sx={{ my: 8 }}>
                    <Grid container spacing={1}>
                        {players.map((player, index) => (
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
                    <Button variant="contained" color="primary" size="large" disabled={players.length === 0}>
                        START QUIZ
                    </Button>
                </Box>
            </Container>
        </>
    );
};