import { Stack, Typography, TextField, Button, Divider, Paper } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { useSnackbar } from "~/contexts/SnackbarContext";
import type { LoginRequest, RegisterRequest } from "~/services/auth/auth.types";
import { ServiceFactory } from "~/services/service-factory";

const authService = ServiceFactory.getAuthService();

export function Welcome() {
    const loginForm = useForm<LoginRequest>({ defaultValues: { email: "", password: "" } });
    const registerForm = useForm<RegisterRequest>({ defaultValues: { username: "", email: "", password: "" } });

    const navigate = useNavigate();
    const snackbar = useSnackbar();

    const onLogin = async (data: LoginRequest) => {
        snackbar.showSnackbar("Logging in...", "info");
        authService.login(data)
            .then(async _ => {
                await navigate("/library");
                snackbar.showSnackbar("Successfully logged in", "success");
            })
            .catch(_ => snackbar.showSnackbar("Login attempt failed", "error"));
    }

    const onRegister = async (data: RegisterRequest) => {
        snackbar.showSnackbar("Registering....", "info");
        authService.register(data)
            .then(_ => snackbar.showSnackbar("Registered successfully", "success"))
            .catch(_ => snackbar.showSnackbar("Unable to create account", "error"));
    }

    return (
        <Stack spacing={4} sx={{ maxWidth: 350, margin: "40px auto", p: 2 }}>
            <Typography variant="h4" textAlign="center" fontWeight="bold">Sparkmind</Typography>

            <Paper variant="outlined" sx={{ p: 3 }}>
                <Stack spacing={2} component="form" onSubmit={loginForm.handleSubmit(onLogin)}>
                    <Typography variant="h6">Login</Typography>
                    <Controller
                        name="email"
                        control={loginForm.control}
                        render={({ field }) => <TextField {...field} label="Email" fullWidth size="small" />}
                    />
                    <Controller
                        name="password"
                        control={loginForm.control}
                        render={({ field }) => <TextField {...field} type="password" label="Password" fullWidth size="small" />}
                    />
                    <Button type="submit" variant="contained" fullWidth>Login</Button>
                </Stack>
            </Paper>

            <Divider />

            <Paper variant="outlined" sx={{ p: 3 }}>
                <Stack spacing={2} component="form" onSubmit={registerForm.handleSubmit(onRegister)}>
                    <Typography variant="h6">Register</Typography>
                    <Controller
                        name="username"
                        control={registerForm.control}
                        render={({ field }) => <TextField {...field} label="Username" fullWidth size="small" />}
                    />
                    <Controller
                        name="email"
                        control={registerForm.control}
                        render={({ field }) => <TextField {...field} label="Email" type="email" fullWidth size="small" />}
                    />
                    <Controller
                        name="password"
                        control={registerForm.control}
                        render={({ field }) => <TextField {...field} type="password" label="Password" fullWidth size="small" />}
                    />
                    <Button type="submit" variant="outlined" fullWidth>Register</Button>
                </Stack>
            </Paper>
        </Stack>
    );
}