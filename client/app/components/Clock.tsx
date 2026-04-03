import { Typography } from "@mui/material";
import { useCountdown } from "~/hooks/useCountdown";

export function Clock({deadline}: {deadline: number}) {
    const {seconds} = useCountdown(deadline, Date.now());

    return (
        <Typography variant="h2">{seconds}</Typography>
    );
}