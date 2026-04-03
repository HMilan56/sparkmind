import { Box, MenuItem, Stack, Typography } from "@mui/material";

export type BasicMenuOptionProps = {
    text: string;
    icon?: React.ReactNode;
    onClick: () => void;
}

export function BasicMenuOption({ text, icon, onClick }: BasicMenuOptionProps) {
    return (
        <MenuItem onClick={() => onClick()}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: '100%', minWidth: '80px' }}
            >
                <Typography component="div">{text}</Typography>
                {icon && <Box sx={{ display: 'flex' }}>{icon}</Box>}
            </Stack>
        </MenuItem>
    );
}