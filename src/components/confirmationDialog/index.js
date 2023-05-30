import React from "react"
import { 
    Button,
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Divider
} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
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
                <DialogTitle className="dialog-title-container">
                    <div className="dialog-title">
                        {title}
                    </div>
                    <CloseIcon 
                    onClick={onClose}
                    className="close-icon"
                    />
                </DialogTitle>
                <DialogContent className="dialog-content">
                    {content}
                </DialogContent>
                <DialogActions className="dialog-actions">
                    <Button
                    onClick={cancelAction}
                    className="action-button cancel-action"
                    >
                        Cancel
                    </Button>
                    <Button
                    onClick={confirmAction}
                    className="action-button confirm-action"
                    >
                        {confirmButtonText}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}