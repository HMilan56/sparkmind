import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import BasicMenu, { type MenuOption } from "./BasicMenu";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const mockOptions: MenuOption[] = [
    { desc: "Edit", icon: <EditIcon color="info" fontSize="small" /> },
    { desc: "Delete", icon: <DeleteForeverIcon color="error" fontSize="small" /> }
]

const longDesc = "Aenean mattis porta venenatis. Duis varius est eu odio elementum, vitae maximus mi pulvinar. Donec consequat rutrum mattis. Donec sed mollis metus. Quisque sapien erat, cursus et diam non, rhoncus tempor justo. Fusce sit amet tincidunt risus. Vestibulum sagittis, est a ornare pharetra, eros dui cursus dolor, ut faucibus lectus lacus malesuada leo. Nullam convallis ornare laoreet. ";
const shortDesc = "Mauris malesuada leo massa, id sodales tellus condimentum sed.";

function truncateText(text: string, maxLength: number) {
    if (text.length <= maxLength) return text;

    // Find the last space within the limit
    const lastSpace = text.lastIndexOf(' ', maxLength);

    // If no space is found (one giant word), just slice it
    if (lastSpace === -1) return text.substring(0, maxLength) + "...";

    return text.substring(0, lastSpace) + "...";
}

export function QuizCard() {
    const text = Math.floor(Math.random() * 2) == 0 ? longDesc : shortDesc;

    return (
        <Card sx={{ width: "100%", height: "100%", maxWidth: "360px"}}>
            <Stack direction={"column"} justifyContent={"space-between"} height={"100%"}>
                <Box>
                    <CardMedia sx={{ height: 180 }} image="https://placehold.co/320x180" />
                    <CardContent sx={{height: 100}}>
                        <Paper sx={{ backgroundColor: grey[800] }}>
                            <Typography fontWeight={600} paddingInlineStart={"5px"} gutterBottom variant="h5" component="div">
                                Quiz title
                            </Typography>
                        </Paper>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {truncateText(text, 200)}
                        </Typography>
                    </CardContent>
                </Box>
                <CardActions sx={{ justifyContent: "flex-end", alignItems: "center" }}>
                    <Button sx={{ borderRadius: "20px", fontWeight: 600 }} color="primary" variant="contained">
                        PLAY
                    </Button>
                    <BasicMenu options={mockOptions} />
                </CardActions>
            </Stack>
        </Card>
    )
}