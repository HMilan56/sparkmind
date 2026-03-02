import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { QuizImage } from "./QuizImage";

export function Details() {
    const { register } = useFormContext();

    return (
        <Stack spacing={2}>
            <Typography variant="h4" fontWeight={600}>Details</Typography>
            <Grid container spacing={5} alignItems="stretch" maxHeight={300}>
                <Grid size={{ md: 6, sm: 12 }}>
                    <Stack spacing={2}>
                        <TextField {...register("title")} label="Title" fullWidth />
                        <TextField
                            {...register("desc")}
                            label="Description"
                            multiline
                            rows={6}
                            fullWidth
                        />
                    </Stack>
                </Grid>

                <Grid size={{ md: 6, sm: 12 }}>
                    <QuizImage
                        src="https://placehold.co/200x120"
                        label="Illustration"
                    />
                </Grid>
            </Grid>
        </Stack>
    );
}