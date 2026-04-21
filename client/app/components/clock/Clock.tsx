import { Typography } from "@mui/material";
import { useCountdown, type TimeContext } from "~/hooks/useCountdown";

export type ClockProps = {
    timeContext: TimeContext,
    fontSize?: number | string
}

export function Clock({ fontSize = "2rem", timeContext }: ClockProps) {
    const {seconds} = useCountdown(timeContext);

    return (
        <Typography fontSize={fontSize}>{seconds}</Typography>
    );
}