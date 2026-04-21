import { Container, Stack, Typography } from "@mui/material";
import type { PlayerStatDto } from "~/services/game/types/player";

type GameOverProps = {
    player: PlayerStatDto;
    totalPlayers: number;
    rank: number;
};

function ordinal(n: number) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}

export function GameOver({ player, totalPlayers, rank }: GameOverProps) {
    return (
        <Container maxWidth="sm">
            <Stack alignItems="center" justifyContent="center" minHeight="100vh" spacing={2}>
                <Typography textAlign={"center"} variant="h1" fontWeight={700}>
                    {ordinal(rank)} place
                </Typography>
                <Typography textAlign={"center"} color="text.secondary">
                    out of {totalPlayers} players
                </Typography>
                <Typography textAlign={"center"} color="info" variant="h4" fontWeight={700}>
                    {player.score.toLocaleString()} pts
                </Typography>
            </Stack>
        </Container>
    );
}