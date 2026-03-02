import { Checkbox, Stack, TextField } from "@mui/material";

export function Answer() {
    return (
        <Stack width={"100%"} direction={"row"}>
            <TextField fullWidth label="Answer1" />
            <Checkbox />
        </Stack>
    )
}