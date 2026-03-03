import { Box, Button, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Details } from "~/components/Details";
import { PageBody } from "~/components/PageBody";
import { Questions } from "~/components/Questions";
import { Settings } from "~/components/Settings";
import { Topbar } from "~/components/Topbar";
import { mockQuizSerivce, type QuizData } from "~/services/quizService";

export default function Editor(quizId: number) {
    const methods = useForm<QuizData>({
        defaultValues: { header: { title: "", desc: "" }}
    });

    const { data, status } = useQuery({
        queryKey: ["quizData", quizId],
        queryFn: () => mockQuizSerivce.getQuizById(quizId)
    });

    useEffect(() => {
        if (data)
            methods.reset(data);
    }, [data]);

    const onSave = (data: QuizData) => {
        console.log("Unified Data:", data);
    };

    return (
        <>
            <Topbar title="Quiz Editor" />
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
                            sx={{ position: 'fixed', bottom: 15, right: 15, zIndex: 1000 }}
                        >
                            SAVE
                        </Button>
                    </Box>
                </FormProvider>
            </PageBody>
        </>
    )
}