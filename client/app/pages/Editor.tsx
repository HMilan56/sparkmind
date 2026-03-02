import { Box, Button, Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { Details } from "~/components/Details";
import { PageBody } from "~/components/PageBody";
import { Settings } from "~/components/Settings";
import { Topbar } from "~/components/Topbar";

export type QuizFormData = {
    title: string,
    desc: string
};

export default function Editor() {
    const methods = useForm<QuizFormData>({
        defaultValues: { title: "", desc: ""}
    });

    const onSave = (data: QuizFormData) => {
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