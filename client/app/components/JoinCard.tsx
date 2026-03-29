import { Container, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useForm } from "react-hook-form";
import { useJoin } from "~/hooks/useJoin";

type JoinForm = {
    nickName: string;
    lobbyCode: string;
};

export function JoinCard() {
    const joinLobby = useJoin();
    
    const { register, handleSubmit } = useForm<JoinForm>();

    const onSubmit = (data: JoinForm) => {
        joinLobby(data.lobbyCode.toUpperCase(), data.nickName);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: "20vh" }}>
            <Paper sx={{ p: 6, borderRadius: 5 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={4}>
                        <Typography textAlign={"center"} variant="h4" fontSize={"2.5rem"} fontWeight={900}>
                            Enter code to play!
                        </Typography>

                        <TextField 
                            {...register("nickName")} 
                            label="Nickname" 
                            fullWidth 
                        />

                        <Stack direction={{ xs: "column", sm: "row" }} alignItems={"center"} spacing={2} sx={{ width: "100%" }}>
                            <TextField 
                                {...register("lobbyCode")} 
                                fullWidth 
                                label="Lobby PIN" 
                            />
                            <IconButton type="submit">
                                <PlayCircleIcon sx={{ fontSize: "4rem" }} />
                            </IconButton>
                        </Stack>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );
}