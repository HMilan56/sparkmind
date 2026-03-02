import { Box, FormControlLabel, FormGroup, Paper, Switch, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export type SwitchWithLabelProps = {
    label: string
};

export default function SwitchWithLabel({ label }: SwitchWithLabelProps) {
    return (
        <Paper sx={{ p: "8px", bgcolor: grey[800], maxWidth: "400px", width: "100%", justifyContent: "center", display: "flex" }}>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch />
                    }
                    label={
                        <Typography fontWeight={600}>{label}</Typography>
                    }
                    labelPlacement="start" />
            </FormGroup>
        </Paper>
    );
}