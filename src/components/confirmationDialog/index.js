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
            open={open}
            onClose={onClose}
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
                    onClick={cancelAction}
                    >
                        Cancel
                    </Button>
                    <Button
                    onClick={confirmAction}
                    >
                        {confirmButtonText}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}