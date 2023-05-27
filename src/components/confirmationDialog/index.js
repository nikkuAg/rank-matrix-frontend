import React from "react"
import { 
    Button,
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Divider
} from "@mui/material"
import "./index.scss"

export const ConfirmationDialog = ({
    open,
    onClose,
    title,
    content,
    confirmButtonText,
    cancelAction,
    confirmAction
}) => {
    return (
        <div>
            <Dialog
            open={true}
            onClose={() => alert("Close")}
            className="confirm-dialog"
            >
                <DialogTitle className="confirm-dialog-title">
                    {title}
                </DialogTitle>
                <Divider />
                <DialogContent className="confirm-dialog-content">
                    {content}
                </DialogContent>
                <DialogActions>
                    <Button
                    onClick={() => alert("Cancel")}
                    >
                        Cancel
                    </Button>
                    <Button
                    onClick={() => alert("Confirm")}
                    >
                        {confirmButtonText}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}