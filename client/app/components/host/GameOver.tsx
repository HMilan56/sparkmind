import { Container, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { brown, grey } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { PlayerStatDto } from "~/services/game/types/player";

type GameOverProps = {
    players: PlayerStatDto[];
    onLobbyEnd: () => void;
};

export function GameOver({ players, onLobbyEnd }: GameOverProps) {
    const sorted = [...players].sort((a, b) => b.score - a.score);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Box mb={8}>
                <Typography textAlign={"center"} variant="h3" fontWeight={700}>FINAL RESULTS</Typography>
            </Box>

            { !isMobile && <Podium sortedPlayers={sorted}/> }

            <Box maxHeight={280} overflow="auto" display="flex" flexDirection="column" gap={0.75}>
                {sorted.map((player, i) => (
                    <Paper key={player.id} variant="outlined">
                        <Stack direction="row" alignItems="center" spacing={1} p={1.5}>
                            <Typography width={24} variant="body2" color="text.secondary">
                                {i + 1}.
                            </Typography>
                            <Typography variant="body2" flex={1} noWrap>
                                {player.name}
                            </Typography>
                            <Stack alignItems="flex-end">
                                <Typography variant="body2" fontWeight={700}>
                                    {player.score.toLocaleString()}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Paper>
                ))}
            </Box>

            <Button fullWidth variant="contained" onClick={onLobbyEnd} sx={{ mt: 4 }}>
                END LOBBY
            </Button>
        </Container>
    );
}

function Podium({ sortedPlayers }: { sortedPlayers: PlayerStatDto[] }) {
    const podiumConfig = [
        { player: sortedPlayers[1], rank: 2, height: 64, color: grey[300] },
        { player: sortedPlayers[0], rank: 1, height: 90, color: "warning.light" },
        { player: sortedPlayers[2], rank: 3, height: 46, color: brown[500] },
    ].filter(item => !!item.player);

    return (
        <Stack direction="row" alignItems="flex-end" justifyContent="center" spacing={1} mb={3}>
            {podiumConfig.map(({ player, rank, height, color }) => (
                <Stack key={player.id} flex={1} alignItems="center">
                    <Typography variant="caption" fontWeight={700} fontSize="1.2rem" noWrap>
                        {player.name}
                    </Typography>
                    <Typography variant="caption" fontSize={"1rem"} color="text.secondary" mb={0.5}>
                        {player.score.toLocaleString()}
                    </Typography>
                    <Box
                        width="100%"
                        height={height}
                        bgcolor={color}
                        borderRadius="4px 4px 0 0"
                        display="flex" alignItems="center" justifyContent="center"
                    >
                        <Typography fontWeight={700} fontSize={20}>{rank}</Typography>
                    </Box>
                </Stack>
            ))}
        </Stack>
    );
}