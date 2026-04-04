import { AppBar, Box, IconButton, Paper, Stack, TextField, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowBack from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router";
import BasicMenu from "./menu/BasicMenu";
import { BasicMenuOption } from "./menu/BasicMenuOption";
import { ServiceFactory } from "~/services/service-factory";
import { useState } from "react";

export type TopbarProps = {
    title: string,
    onLogoClick?: () => void;
    onSearch?: (item: string) => void;
};

export function Topbar({ title, onLogoClick, onSearch }: TopbarProps) {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    function logout() {
        const authService = ServiceFactory.getAuthService();
        authService.logout();
        navigate(`/host`);
    }

    const [showMobileSearch, setShowMobileSearch] = useState(false);

    if (isMobile && showMobileSearch) {
        return (
            <AppBar position="sticky" sx={{ bgcolor: 'background.paper' }}>
                <Toolbar>
                    <Stack direction="row" width="100%" alignItems="center" spacing={1}>
                        <IconButton onClick={() => setShowMobileSearch(false)}>
                            <ArrowBack />
                        </IconButton>
                        <TextField
                            autoFocus
                            fullWidth
                            placeholder="Search..."
                            variant="standard"
                        />
                    </Stack>
                </Toolbar>
            </AppBar>
        );
    }

    return (
        <AppBar position="sticky" elevation={1} sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
            <Toolbar>
                <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">

                    <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 2 }}>
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                            <Box
                                component="img"
                                src="https://placehold.co/100x50"
                                alt="LOGO"
                                sx={{ height: { xs: 30, sm: 40 }, width: 'auto' }}
                            />
                        </Link>

                        {!isMobile && (
                            <Typography fontWeight={700} variant="h5" noWrap>
                                {title}
                            </Typography>
                        )}
                    </Stack>

                    {isMobile ? (
                        <IconButton color="inherit" onClick={() => setShowMobileSearch(true)}>
                            <SearchIcon />
                        </IconButton>
                    ) : (
                        <Paper
                            variant="outlined"
                            sx={{ display: 'flex', alignItems: 'center', border: 'none' }}
                        >
                            <TextField
                                sx={{ p: 1 }}
                                placeholder="Search..."
                                variant="standard"
                            />
                            <IconButton size="small">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    )}

                    <Stack direction="row" alignItems="center" spacing={1}>
                        {!isMobile && (
                            <Typography variant="body2" fontWeight={500}>
                                Username
                            </Typography>
                        )}
                        <BasicMenu menuIcon={<AccountCircle fontSize="large" />}>
                            {isMobile && <Box sx={{ px: 2, py: 1, fontWeight: 'bold' }}>Username</Box>}
                            <BasicMenuOption
                                text="Log out"
                                icon={<LogoutIcon color="error" />}
                                onClick={() => logout()}
                            />
                        </BasicMenu>
                    </Stack>

                </Box>
            </Toolbar>
        </AppBar>
    );
}