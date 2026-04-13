import { Box, Card, CardActionArea, CardContent, Container, Grid, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import { LaptopMac, PersonAdd } from "@mui/icons-material";

export default function Home() {
    const navigate = useNavigate();

    return (
        <Box sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
        }}>
            <Container maxWidth="md">
                <Typography variant="h2" textAlign="center" fontWeight={900} gutterBottom sx={{ mb: 8 }}>
                    SparkMind
                </Typography>

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Card elevation={4} sx={{ borderRadius: 4, transition: "0.3s", "&:hover": { transform: "scale(1.02)" } }}>
                            <CardActionArea onClick={() => navigate("/host")} sx={{ p: 4 }}>
                                <CardContent>
                                    <Stack alignItems="center" spacing={2}>
                                        <LaptopMac sx={{ fontSize: 80, color: "primary.main" }} />
                                        <Typography variant="h4" fontWeight={700}>HOST</Typography>
                                        <Typography variant="body1" textAlign="center" color="text.secondary">
                                            Create a new quiz and invite your friends to play!
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Card elevation={4} sx={{ borderRadius: 4, transition: "0.3s", "&:hover": { transform: "scale(1.02)" } }}>
                            <CardActionArea onClick={() => navigate("/play")} sx={{ p: 4 }}>
                                <CardContent>
                                    <Stack alignItems="center" spacing={2}>
                                        <PersonAdd sx={{ fontSize: 80, color: "secondary.main" }} />
                                        <Typography variant="h4" fontWeight={700}>JOIN</Typography>
                                        <Typography variant="body1" textAlign="center" color="text.secondary">
                                            Have a PIN code? Enter it here and start playing now!
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}