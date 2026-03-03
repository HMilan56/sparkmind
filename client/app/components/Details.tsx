import { Grid, Stack, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { QuizImage } from "./QuizImage";

const width = 600;
const height = 400;
const src = `https://placehold.co/${width}x${height}?text=Quiz Image`

export function Details() {
    const { control } = useFormContext();

    return (
        <Stack spacing={2}>
            <Typography variant="h4" fontWeight={600}>Details</Typography>
            <Grid container spacing={5}>
                <Grid size={{ md: 6, sm: 12 }}>
                    <Stack spacing={2}>
                        <Controller
                            control={control}
                            name="header.title"
                            render={({ field: { onChange, value } }) => (
                                <TextField onChange={onChange} value={value} label="Title" fullWidth />
                            )} />
                        <Controller
                            control={control}
                            name="header.desc"
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    onChange={onChange}
                                    label="Description"
                                    value={value}
                                    multiline
                                    rows={6}
                                    fullWidth
                                />
                            )} />
                    </Stack>
                </Grid>

                <Grid size={{ md: 6, sm: 12 }} display={"flex"} justifyContent={{ md: "flex-end", sm: "center" }}>
                    <QuizImage src={src} label={"Illustration"} />
                </Grid>
            </Grid>
        </Stack>
    );
}