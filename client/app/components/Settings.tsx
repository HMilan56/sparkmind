import { Box, Grid, Stack, Typography } from "@mui/material";
import SwitchWithLabel from "./SwitchWithLabel";
import { useFormContext } from "react-hook-form";

const modes = [
    "https://placehold.co/600x400?text=Mode",
    "https://placehold.co/600x400?text=Mode",
    "https://placehold.co/600x400?text=Mode",
    "https://placehold.co/600x400?text=Mode",
]

export function Settings() {
    const { register } = useFormContext();

    return (
        <Stack spacing={5}>
            <Typography variant="h4" fontWeight={600}>Settings</Typography>
            <Stack spacing={10}>
                <Grid container spacing={15}>
                    {modes.map((mode, idx) =>
                        <Grid key={idx} size={{ md: 3, sm: 6, xs: 12 }}>
                            <img
                                src={`${mode}${idx + 1}`}
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

                <Grid container spacing={10}>
                    <Grid size={6}>
                        <Stack gap={3} alignItems={"flex-start"}>
                            <SwitchWithLabel label="Setting #1" />
                            <SwitchWithLabel label="Setting #2" />
                        </Stack>
                    </Grid>
                    <Grid size={6}>
                        <Stack gap={3} alignItems={"flex-end"}>
                            <SwitchWithLabel label="Setting #3" />
                            <SwitchWithLabel label="Setting #4" />
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
    );
}