import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { PageBody } from "~/components/PageBody";
import { QuizGrid } from "~/components/QuizGrid";
import { Topbar } from "~/components/Topbar";
import { quizService } from "~/services/quiz-service/service-factory";

const userId = 1;

export default function Library() {
    const { data, status } = useQuery({
        queryKey: ["userLibrary", userId],
        queryFn: () => quizService.getUserLibrary(userId),
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