import { PageBody } from "~/components/PageBody";
import { QuizGrid } from "~/components/QuizGrid";
import { Topbar } from "~/components/Topbar";

export default function Library() {
    return (
        <>
            <Topbar title="Quiz Library"/>
            <PageBody>
                <QuizGrid />
            </PageBody>
        </>
    )
}