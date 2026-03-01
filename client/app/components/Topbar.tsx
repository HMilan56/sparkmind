import { Box, Link, Paper, Stack } from "@mui/material";

export function Topbar() {
    return (
        <Paper sx={{background: "primary.main"}} >
            <Stack padding={5} direction={"row"} spacing={5}>
                <Link>Option1</Link>
                <Link>Option2</Link>
            </Stack>
        </Paper>
    )
}