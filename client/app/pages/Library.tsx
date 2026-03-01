import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router";
import { Topbar } from "~/components/Topbar";

export default function Library() {
    return (
        <>
            <Topbar/>
            <Box>
                <Typography variant="h1">Headline 1</Typography>
                <Typography variant="h2">Headline 2</Typography>

                <Paper sx={{padding: 2, width: "50%"}}>
                    <Stack spacing={2}>
                        <Button variant="contained">Click me!</Button>
                        <Button variant="text">Click me 2!</Button>
                    </Stack>
                </Paper>
            </Box>
        </>
    )
}