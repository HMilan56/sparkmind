import { Box, IconButton, Paper, Typography } from "@mui/material";
import UploadIcon from '@mui/icons-material/Upload';
import { grey } from "@mui/material/colors";

export type QuizImageProps = {
    src: string,
    label: string,
    width?: string | number,
    height?: string | number
};

export function QuizImage({ src, label, width = "100%", height = "auto" }: QuizImageProps) {
    return (
        <Box
            width={"fit-content"}
            position="relative"
        >
            <Paper 
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 2,
                    borderRadius: "0 0 5px",
                    p: "8px"
                }}
            >
                <Typography>{label}</Typography>
            </Paper>

            <IconButton
                sx={{
                    position: "absolute",
                    bottom: 20,
                    right: 10,
                    zIndex: 2,
                    bgcolor: grey[900]
                }}
            >
                <UploadIcon/>
            </IconButton>

            <img src={src} alt="Quiz illustration" height={"240px"} width={"auto"} />
        </Box>
    );
}