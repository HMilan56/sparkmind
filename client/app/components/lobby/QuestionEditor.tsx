import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { grey } from '@mui/material/colors';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { Answer } from '../editor/Answer';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import type { QuizData } from '~/services/quiz/quiz.types';


export type QuestionEditorProps = {
    index: number;
    onRemove: () => void;
}

export function QuestionEditor({ index, onRemove }: QuestionEditorProps) {
    const { control } = useFormContext<QuizData>();

    const { fields: answerFields, append: appendAnswer, remove: removeAnswer } = useFieldArray({
        control,
        name: `questions.${index}.answers`
    });

    function addAnswer() {
        appendAnswer({ id: 0, text: "", isCorrect: false })
    }

    return (
        <div>
            <Accordion sx={{ bgcolor: grey[600] }}>
                <AccordionSummary

                    expandIcon={<ArrowDropDownIcon />}
                >
                    <Typography component="span">Question #1</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <Grid container spacing={5}>
                        <Grid size={8}>
                            <Stack spacing={5}>
                                <Controller
                                    control={control}
                                    name={`questions.${index}.text`}
                                    render={({ field: { value, onChange } }) =>
                                        <TextField
                                            value={value}
                                            onChange={onChange}
                                            fullWidth
                                            multiline
                                            rows={3}
                                            label="Question text"
                                        />
                                    }
                                />
                                <Stack spacing={2}>
                                    {answerFields.map((field, answerIndex) =>
                                        <Answer
                                            key={field.id}
                                            questionIndex={index}
                                            answerIndex={answerIndex}
                                            onRemove={() => removeAnswer(answerIndex)}
                                        />
                                    )}
                                    <Stack direction={"row"} gap={1}>
                                        <Button color="inherit" variant="contained" sx={{ alignSelf: "flex-start" }} onClick={addAnswer}>Add answer</Button>
                                        <Button variant='contained' color="error" startIcon={<DeleteForeverIcon />} onClick={onRemove}>Delete question</Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}