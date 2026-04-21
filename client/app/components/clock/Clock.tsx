import { Typography } from "@mui/material";
import { useCountdown, type TimeContext } from "~/hooks/useCountdown";

export type ClockProps = {
    timeContext: TimeContext
}

export function Clock({ timeContext }: ClockProps) {
    const {seconds} = useCountdown(timeContext);

    return (
        <Typography variant="h3">{seconds}</Typography>
    );
}