import { AppBar, Box, IconButton, Paper, Stack, TextField, Toolbar, Typography } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import BasicMenu, { type MenuOption } from "./BasicMenu";
import LogoutIcon from '@mui/icons-material/Logout';

const mockOptions: MenuOption[] = [
    { desc: "Logout", icon: <LogoutIcon color="error" fontSize="small"/> }
];

export function Topbar() {
    return (
        <AppBar position="sticky" sx={{ p: 1 }}>
            <Toolbar>
                <Box width={"100%"} display={"flex"} justifyContent={"space-between"} >
                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                        <Typography fontWeight={600} variant="h3">Quiz Library</Typography>
                        <img src="https://placehold.co/100x50" alt="LOGO" title="LOGO"></img>
                        <Paper>
                            <Stack spacing={2} paddingX={1} direction={"row"}>
                                <TextField variant="standard" />
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </Stack>
                        </Paper>
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"} gap={1}>
                        <Typography>Username</Typography>
                        <BasicMenu options={mockOptions} menuIcon={<AccountCircle/>} />
                    </Stack>
                </Box>
            </Toolbar>
        </AppBar>
    );
}