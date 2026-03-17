import { Box, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { PageBody } from "~/components/PageBody";
import { QuizGrid } from "~/components/QuizGrid";
import { Topbar } from "~/components/Topbar";
import type { QuizHeader } from "~/services/quiz/quiz.types";
import { ServiceFactory } from "~/services/service-factory";

const userId = 1;

const quizService = ServiceFactory.getQuizService();

export default function Library() {
    const { data, status } = useQuery({
        queryKey: ["userLibrary", userId],
        queryFn: () => quizService.getUserLibrary(),
        enabled: !Number.isNaN(userId)
    });

    return (
        <>
            <Topbar title="Quiz Library" />
            {status === "success" ? (
                <LibraryBody data={data}/>
            ): <LibraryLoading />}
        </>)
}

function LibraryBody({data}: {data: QuizHeader[]}) {
    return (
        <PageBody>
            <QuizGrid cardData={data} />
        </PageBody>
    );
}

function LibraryLoading() {
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