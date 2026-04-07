import { Box, LinearProgress } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useCountdown } from "~/hooks/useCountdown";

type ClockProgressBarProps = {
    deadline: number;
};

export function ClockProgressBar({ deadline }: ClockProgressBarProps) {
    const { seconds } = useCountdown(deadline, Date.now());
    
    const [startTime] = useState(Date.now());
    const [totalDuration, setTotalDuration] = useState(0);

    useEffect(() => {
        const diff = Math.max(0, Math.floor((deadline - startTime) / 1000));
        setTotalDuration(diff);
    }, [deadline, startTime]);

    const progress = useMemo(() => {
        if (totalDuration <= 0) return 0;

        const elapsed = totalDuration - seconds;
    
        return Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
    }, [seconds, totalDuration]);

    return (
        <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                    flexGrow: 1,
                    height: 12,
                    borderRadius: 5,
                    bgcolor: "divider",
                    "& .MuiLinearProgress-bar": {
                        borderRadius: 5,
                        transition: "transform 1s linear",
                    }
                }}
            />
        </Box>
    );
}