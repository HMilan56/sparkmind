import { Box, FormControlLabel, FormGroup, Switch } from "@mui/material";

export type SwitchWithLabelProps = {
    label: string
};

export default function SwitchWithLabel() {
    return (
        <Box display={"flex"} justifyContent={"flex-start"}>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch defaultChecked />
                    }
                    label="Label"
                    labelPlacement="start" />
            </FormGroup>
        </Box>
    );
}