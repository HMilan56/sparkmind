import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { PlayerStatDto } from "~/services/game/types/player";

export type LeaderboardProps = {
    players: PlayerStatDto[];
    totalQuestions?: number;
    currentQuestion?: number;
    onClick: () => void;
};

export function Leaderboard({ players, totalQuestions = 10, currentQuestion = 10, onClick }: LeaderboardProps) {
    const [displayedScores, setDisplayedScores] = useState<PlayerStatDto[]>(
        players.map(p => ({
            ...p,
            delta: 0,
            score: p.score - p.delta
        }))
    );
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setDisplayedScores(players);
        }, 200);
        
        return () => clearTimeout(timer);
    }, [players]);

    const sortedTop10 = [...displayedScores]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

    return (
        <Box sx={{ maxWidth: 480, mx: "auto", p: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: 2, px: 0.5 }}>
                <Typography variant="overline" sx={{ fontWeight: 700, color: grey[600] }}>
                    LEADERBOARD
                </Typography>
                <Typography variant="caption" sx={{ color: grey[500] }}>
                    {currentQuestion} / {totalQuestions}
                </Typography>
            </Stack>

            <Box sx={{ position: "relative" }}>
                <AnimatePresence mode="popLayout" initial={false}>
                    {sortedTop10.map((player, i) => {
                        const rank = i + 1;

                        return (
                            <motion.div
                                key={player.id}
                                layoutId={String(player.id)}
                                layout
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{
                                    layout: {
                                        type: "tween",
                                        ease: "easeInOut"
                                    },
                                    opacity: { duration: 0.3 }
                                }}
                                style={{
                                    width: "100%",
                                    marginBottom: "8px",
                                }}
                            >
                                <Paper
                                    elevation={1}
                                    sx={{
                                        p: 1.5,
                                        display: "flex",
                                        alignItems: "center",
                                        borderRadius: 1,
                                        backfaceVisibility: "hidden"
                                    }}
                                >
                                    <Typography sx={{ width: 32, fontWeight: rank <= 3 ? 700 : 400 }}>
                                        {rank}.
                                    </Typography>

                                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                display: "block"
                                            }}
                                        >
                                            {player.name}
                                        </Typography>
                                    </Box>

                                    <Stack alignItems="flex-end" sx={{ ml: 2 }}>
                                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                            {player.score.toLocaleString()}
                                        </Typography>
                                        {player.delta > 0 && (
                                            <Typography variant="caption" sx={{ color: "success.main" }}>
                                                +{player.delta}
                                            </Typography>
                                        )}
                                    </Stack>
                                </Paper>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </Box>
            <Button variant="contained" onClick={onClick}>Next question</Button>
        </Box>
    );
}