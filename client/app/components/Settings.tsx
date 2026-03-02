import { Grid, Stack, Typography } from "@mui/material";
import SwitchWithLabel from "./SwitchWithLabel";

const modes = [
    "https://placehold.co/200x200",
    "https://placehold.co/200x200",
    "https://placehold.co/200x200",
    "https://placehold.co/200x200"
]

export function Settings() {
    return (
        <Stack spacing={2}>
            <Typography variant="h4" fontWeight={600}>Settings</Typography>
            <Grid container spacing={15}>
                {modes.map((mode, idx) =>
                    <Grid key={idx} size={{ md: 3, sm: 6, xs: 12 }}>
                        <img
                            src={mode}
                            alt={`Mode ${idx}`}
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                borderRadius: '4px'
                            }}
                        />
                    </Grid>
                )}
            </Grid>
            <SwitchWithLabel />
        </Stack>
    );
}