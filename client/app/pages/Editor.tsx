import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { Details } from "~/components/Details";
import { PageBody } from "~/components/PageBody";
import { Questions } from "~/components/Questions";
import { Settings } from "~/components/Settings";
import { Topbar } from "~/components/Topbar";
import { useSnackbar } from "~/contexts/SnackbarContext";
import type { QuizData } from "~/services/quiz/quiz.types";
import { ServiceFactory } from "~/services/service-factory";

const quizService = ServiceFactory.getQuizService();

export default function Editor() {
    const { quizId: quizIdParam } = useParams();

    const quizId = Number(quizIdParam);

    const navigate = useNavigate()

    const { data, status } = useQuery({
        queryKey: ["quizData", quizId],
        queryFn: () => quizService.getQuizById(quizId),
        enabled: !Number.isNaN(quizId)
    });

    return (
        <>
            <Topbar title="Quiz Editor" />
            {
                status === "success" ? (
                    <EditorBody data={data} />
                ) : status === "pending" ? (
                    <EditorLoading />
                ) : <ErrorDialog onDismiss={() => navigate({ pathname: "/" })} />
            }
        </>
    )
}

function ErrorDialog({ onDismiss }: { onDismiss: () => void }) {
    return (
        <Dialog open={true}>
            <DialogTitle>
                Failed to load quiz
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    An error occurred while fetching data from the service. Please attempt your request again later.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onDismiss} autoFocus>
                    GO BACK
                </Button>
            </DialogActions>
        </Dialog>
    );
}

function EditorLoading() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 600,
                height: "100%",
                flexGrow: 1
            }}
        >
            <CircularProgress color="inherit" size={"4rem"} />
        </Box>
    );
}

function EditorBody({ data }: { data: QuizData | null }) {
    const methods = useForm<QuizData>();

    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        if (data)
            methods.reset(data);
    }, [data]);

    const onSave = async (data: QuizData) => {
        showSnackbar("Saving changes...", "info");
        await quizService.saveQuiz(data);
        showSnackbar("Save complete.", "success");
    };

    return (
        <PageBody>
            <FormProvider {...methods}>
                <Box marginX={5} component="form" onSubmit={methods.handleSubmit(onSave)}>
                    <Stack spacing={5}>
                        <Details />
                        <Settings />
                        <Questions />
                    </Stack>
                    <Button
                        size="large"
                        type="submit"
                        variant="contained"
                        sx={{ position: "fixed", bottom: 15, right: 15, zIndex: 1000 }}
                    >
                        SAVE
                    </Button>
                </Box>
            </FormProvider>
        </PageBody>
    )
}