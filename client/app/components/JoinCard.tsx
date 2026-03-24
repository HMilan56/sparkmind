import { Container, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useState } from "react";
import { useJoin } from "~/hooks/useJoin";

export function JoinCard() {
    const [lobbyCode, setLobbyCode] = useState("");

    const joinLobby = useJoin();

    return (
        <Container maxWidth="sm" sx={{ mt: "20vh" }}>
            <Paper sx={{ p: 6, borderRadius: 5 }}>
                <Stack spacing={4}>
                    <Typography textAlign={"center"} variant="h4" fontSize={"2.5rem"} fontWeight={900}>Enter code to play!</Typography>
                    <Stack direction={{ xs: "column", sm: "row" }} alignItems={"center"} spacing={2} sx={{ width: "100%" }}>
                        <TextField onChange={e => setLobbyCode(e.target.value.toUpperCase())} value={lobbyCode} fullWidth label="Lobby PIN" />
                        <IconButton onClick={() => { joinLobby(lobbyCode, "TEST USER" + Math.floor(Math.random() * 100)) }}>
                            <PlayCircleIcon sx={{ fontSize: "4rem" }} />
                        </IconButton>
                    </Stack>
                </Stack>
            </Paper>
        </Container>
    );
}