import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import BasicMenu, { type MenuOption } from "./BasicMenu";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import type { QuizHeader } from "~/services/quiz-service/types";
import { useNavigate } from "react-router";
import { mockQuizSerivce } from "~/services/quiz-service/mock-service";

function truncateText(text: string, maxLength: number) {
    if (text.length <= maxLength) return text;

    // Find the last space within the limit
    const lastSpace = text.lastIndexOf(' ', maxLength);

    // If no space is found (one giant word), just slice it
    if (lastSpace === -1) return text.substring(0, maxLength) + "...";

    return text.substring(0, lastSpace) + "...";
}

export type QuizCardProps = {
    data: QuizHeader;
    onEdit: () => void;
    onDelete: () => void;
}

export function QuizCard({ data, onEdit, onDelete }: QuizCardProps) {
    return (
        <Card sx={{ width: "100%", height: "100%", maxWidth: "360px" }}>
            <Stack direction={"column"} justifyContent={"space-between"} height={"100%"}>
                <Box>
                    <CardMedia sx={{ height: 180 }} image="https://placehold.co/320x180" />
                    <CardContent sx={{ height: 100 }}>
                        <Paper sx={{ backgroundColor: grey[800] }}>
                            <Typography fontWeight={600} paddingInlineStart={"5px"} gutterBottom variant="h5" component="div">
                                {data.title}
                            </Typography>
                        </Paper>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {truncateText(data.desc, 200)}
                        </Typography>
                    </CardContent>
                </Box>
                <CardActions sx={{ justifyContent: "flex-end", alignItems: "center" }}>
                    <Button sx={{ borderRadius: "20px", fontWeight: 600 }} color="primary" variant="contained">
                        PLAY
                    </Button>
                    <BasicMenu options={[
                        { desc: "Edit", icon: <EditIcon color="info" fontSize="small" />, onClick: onEdit },
                        { desc: "Delete", icon: <DeleteForeverIcon color="error" fontSize="small" />, onClick: onDelete }
                    ]} />
                </CardActions>
            </Stack>
        </Card>
    )
}