import { Box, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { QuizImage } from "./QuizImage";
// import { QuizImage } from "./QuizImage";

const width = 600;
const height = 400;
const src = `https://placehold.co/${width}x${height}?text=Quiz Image`

export function Details() {
    const { register } = useFormContext();

    return (
        <Stack spacing={2}>
            <Typography variant="h4" fontWeight={600}>Details</Typography>
            <Grid container spacing={5}>
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

                <Grid size={{ md: 6, sm: 12 }} display={"flex"} justifyContent={{ md: "flex-end", sm: "center" }}>
                    <QuizImage src={src} label={"Illustration"} />
                </Grid>
            </Grid>
        </Stack>
    );
}