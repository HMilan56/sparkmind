import { Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

export function AddQuizCard({ onClick }: { onClick: () => void }) {
    return (
        <Button
            onClick={onClick}
            sx={{
                width: "100%",
                maxWidth: "360px",
                height: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "4px",
                color: "grey.500",
                textTransform: "none",
                "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.07)",
                    color: "primary.main",
                    borderColor: "primary.main"
                }
            }}
        >
            <Add sx={{ fontSize: 60, mb: 1 }} />
            <Typography variant="h6" fontWeight={500}>New Quiz</Typography>
        </Button>
    );
}