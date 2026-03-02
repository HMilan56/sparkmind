import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

export function PageBody({children}: {children: React.ReactNode}) {
    return (
        <Box sx={{
            maxWidth: "1400px",
            margin: "auto",
            padding: "20px",
            backgroundColor: grey[700],
            height: "100%"
        }}>{children}</Box>
    );
}