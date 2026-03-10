import { Grid, type AlertProps } from "@mui/material";
import { QuizCard } from "./QuizCard";
import type { QuizHeader } from "~/services/quiz-service/types";
import { useNavigate } from "react-router";
import { mockQuizService } from "~/services/quiz-service/mock-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddQuizCard } from "./AddQuizCard";
import { useSnackbar } from "~/contexts/SnackbarContext";

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
    const { showSnackbar } = useSnackbar();

    const { mutate: deleteQuiz } = useMutation({
        mutationFn: (quizId: number) => mockQuizService.deleteQuizById(quizId),
        onMutate: () => {
            showSnackbar("Deleting quiz...", "error");
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["userLibrary"] });
            showSnackbar("Quiz successfully deleted", "success");
        }
    })

    const { mutate: createQuiz } = useMutation({
        mutationFn: (userId: number) => mockQuizService.createQuiz(userId),
        onMutate: () => {
            showSnackbar("Creating quiz...", "info");
        },
        onSuccess: (newQuiz) => {
            queryClient.setQueryData(["quiz", newQuiz.header.id], newQuiz);
            queryClient.invalidateQueries({queryKey: ["userLibrary"]})
            navigate(`/editor/${newQuiz.header.id}`);
        }
    });

    return (
        <Grid
                container
                spacing={5}
            >
                <Grid size={{ xs: 12, sm: 6, md: 4 }} display="flex"
                    justifyContent="center">
                    <AddQuizCard onClick={() => createQuiz(1)} />
                </Grid>
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
                            onDelete={() => deleteQuiz(header.id)}
                        />
                    </Grid>
                ))}
            </Grid>
    );
}