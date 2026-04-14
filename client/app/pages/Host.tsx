import { Stack, Typography, TextField, Button, Divider, Paper } from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { useSnackbar } from "~/contexts/SnackbarContext";
import type { LoginRequest, RegisterRequest } from "~/services/auth/auth.types";
import { ServiceFactory } from "~/services/service-factory";

const authService = ServiceFactory.getAuthService();

export default function Host() {
    const loginForm = useForm<LoginRequest>({ defaultValues: { email: "", password: "" } });
    const registerForm = useForm<RegisterRequest>({ defaultValues: { username: "", email: "", password: "" } });

    const [registerLoading, setRegisterLoading] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);

    const navigate = useNavigate();
    const snackbar = useSnackbar();

    const onLogin = async (data: LoginRequest) => {
        snackbar.showSnackbar("Logging in...", "info");
        setLoginLoading(true);

        try {
            await authService.login(data);
            await navigate("/host/library");
            snackbar.showSnackbar("Successfully logged in", "success");
        } catch (err) {
            snackbar.showSnackbar("Login attempt failed", "error");
            console.log(err);
        } finally {
            setLoginLoading(false);
            loginForm.reset();
        }
    }

    const onRegister = async (data: RegisterRequest) => {
        snackbar.showSnackbar("Registering....", "info");
        setRegisterLoading(true);

        try {
            await authService.register(data);
            snackbar.showSnackbar("Registered successfully", "success");

        } catch (err) {
            snackbar.showSnackbar("Unable to create account", "error");
            console.log(err);
        } finally {
            setRegisterLoading(false);
            registerForm.reset();
        }
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
                    <Button type="submit" variant="contained" fullWidth loading={loginLoading}>Login</Button>
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
                    <Button type="submit" variant="outlined" fullWidth loading={registerLoading}>Register</Button>
                </Stack>
            </Paper>
        </Stack>
    );
}
