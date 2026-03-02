import { AppBar, Box, IconButton, Paper, Stack, TextField, Toolbar, Typography } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import BasicMenu, { type MenuOption } from "./BasicMenu";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router";

const mockOptions: MenuOption[] = [
    { desc: "Logout", icon: <LogoutIcon color="error" fontSize="small"/> }
];

export type TopbarProps = {
    title: string
};

export function Topbar({title}: TopbarProps) {
    return (
        <AppBar position="sticky" sx={{ p: 1 }}>
            <Toolbar>
                <Box width={"100%"} display={"flex"} justifyContent={"space-between"} >
                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                        <Typography fontWeight={600} variant="h3">{title}</Typography>
                        <Link to={"/"}>
                            <Box display={"flex"} alignItems={"center"}>
                                <img src="https://placehold.co/100x50" alt="LOGO" title="LOGO"></img>
                            </Box>
                        </Link>
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