import { Alert, Snackbar, type AlertColor } from "@mui/material";
import { createContext, useState, useMemo, useCallback, type ReactNode, useContext } from "react";

type SnackbarContextType = {
    showSnackbar: (message: string, severity?: AlertColor) => void;
};

export const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export function SnackbarProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<AlertColor>("info");

    const showSnackbar = useCallback((msg: string, sev: AlertColor = "info") => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => setOpen(false), []);

    const contextValue = useMemo(() => ({
        showSnackbar
    }), [showSnackbar]);

    return (
        <SnackbarContext.Provider value={contextValue}>
            {children}
            <Snackbar anchorOrigin={{horizontal: "center", vertical: "bottom"}} open={open} autoHideDuration={4000} onClose={handleClose} >
                <Alert onClose={handleClose} severity={severity} variant="filled">
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
}

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    
    if (!context)
        throw new Error("useSnackbar must be used within a SnackbarProvider");
    
    return context;
};