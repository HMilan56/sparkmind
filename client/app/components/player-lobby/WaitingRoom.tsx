import React from "react";
import { Box, Typography, CircularProgress, Container } from "@mui/material";

export type WaitingRoomProps = {
    title: string;
    subtitle?: string;
}

export function WaitingRoom({ title, subtitle }: WaitingRoomProps) {
    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100dvh",
                    textAlign: "center",
                }}
            >
                <CircularProgress size={60} sx={{ mb: 4, color: "primary.main" }} />

                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "1.5rem", sm: "2rem" },
                        mb: 2
                    }}
                >
                    {title}
                </Typography>

                {
                    subtitle && (
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ fontStyle: "italic" }}
                        >
                            {subtitle}
                        </Typography>
                    )
                }
            </Box>
        </Container>
    );
};