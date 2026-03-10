import { FormControlLabel, FormGroup, Paper, Switch, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export type SwitchWithLabelProps = {
    label: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SwitchWithLabel({ label, checked, onChange }: SwitchWithLabelProps) {
    return (
        <Paper sx={{ p: "8px", bgcolor: grey[800], maxWidth: "400px", width: "100%", justifyContent: "center", display: "flex" }}>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch checked={checked} onChange={onChange}/>
                    }
                    label={
                        <Typography fontWeight={600}>{label}</Typography>
                    }
                    labelPlacement="start" />
            </FormGroup>
        </Paper>
    );
}