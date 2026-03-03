import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { grey } from '@mui/material/colors';
import { Grid, Stack, TextField } from '@mui/material';
import { Answer } from './Answer';

export function QuestionEditor() {
    return (
        <div>
            <Accordion sx={{bgcolor: grey[600]}}>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                >
                    <Typography component="span">Question #1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={5}>
                        <Grid size={8}>
                            <Stack spacing={5}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Question text"
                                />
                                <Stack spacing={1}>
                                    <Answer />
                                    <Answer />
                                    <Answer />
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}