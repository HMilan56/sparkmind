import { Alert, Grid, Snackbar, type AlertProps } from "@mui/material";
import { QuizCard } from "./QuizCard";
import type { QuizHeader } from "~/services/quiz-service/types";
import { useNavigate } from "react-router";
import { mockQuizSerivce } from "~/services/quiz-service/mock-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export type QuizGridProps = {
    cardData: QuizHeader[];
}

type AlertState = {
    text: string,
    severity: AlertProps["severity"],
    open: boolean
}

export function QuizGrid({ cardData }: QuizGridProps) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [alertState, setAlertState] = useState<AlertState>({
        text: "",
        severity: "info",
        open: false
    });

    const { mutate } = useMutation({
        mutationFn: (id: number) => mockQuizSerivce.deleteQuizById(id),
        onMutate: () => {
            openAlert("Deleting quiz...", "error");
        },
        onSuccess: () => {
            openAlert("Quiz successfully deleted", "success");
            queryClient.invalidateQueries({ queryKey: ["userLibrary"] });
        }
    })

    function openAlert(text: string, severity: AlertProps["severity"]) {
        setAlertState({
            text,
            severity,
            open: true
        });
    }

    function handleClose() {
        setAlertState(prevState => ({
            ...prevState,
            open: false
        }));
    }

    return (
        <>
            <Grid
                container
                spacing={5}
            >
                {cardData.map(header => (
                    <Grid
                        key={header.id}
                        size={{ xs: 12, sm: 6, md: 4 }}
                        display="flex"
                        justifyContent="center"
                        height={"400px"}
                    >
                        <QuizCard
                            data={header}
                            onEdit={() => void navigate(`/editor/${header.id}`)}
                            onDelete={() => mutate(header.id)}
                        />
                    </Grid>
                ))}
            </Grid>
            <AlertSnackbar {...alertState} handleClose={handleClose}/>
        </>
    );
}

function AlertSnackbar({ text, open, severity, handleClose }: { text: string, open: boolean, severity: AlertProps["severity"], handleClose: () => void }) {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} >
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {text}
            </Alert>
        </Snackbar>
    );
}