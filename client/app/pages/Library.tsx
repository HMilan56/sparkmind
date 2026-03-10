import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { PageBody } from "~/components/PageBody";
import { QuizGrid } from "~/components/QuizGrid";
import { Topbar } from "~/components/Topbar";
import { mockQuizSerivce } from "~/services/quiz-service/mock-service";

const userId = 1;

export default function Library() {
    const { data, status } = useQuery({
        queryKey: ["userLibrary", userId],
        queryFn: () => mockQuizSerivce.getUserLibrary(userId),
        enabled: !Number.isNaN(userId)
    });
    
    return (
        <>
            <Topbar title="Quiz Library"/>
            <PageBody>
                { status === "success" ? (
                    <QuizGrid cardData={data}/>
                ) : <Typography>Loading</Typography> }
            </PageBody>
        </>
    )
}