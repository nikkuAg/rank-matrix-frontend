import { Popper, Box, Typography, TextField, Button, Paper, Collapse } from "@mui/material"
import { useState } from "react";

export const TextForm = ({ isOpen, filter, setFilterValues, filterValues, hid, handleParentClose }) => {
    const [formValue, setFormValue] = useState("");
    const handleChange = (event) => {
        setFormValue(event.target.value);
    }
    const handleSubmit = () => {
        handleParentClose(hid);
        setFilterValues({ ...filterValues, [filter.keyword]: formValue });
    }
    return (
        <Collapse in={isOpen} timeout="auto">
            <Box sx={{ padding: "0.5rem 1rem" }}>
                <TextField size="small" value={formValue} onChange={handleChange} />
                <Button variant="contained" onClick={handleSubmit}>Apply</Button>
            </Box>
        </Collapse>
    )
}