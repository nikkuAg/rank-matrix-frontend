import { Popper, Box, Typography, Button, Select, MenuItem, Paper, Collapse, FormControl } from "@mui/material"
import { filter_choices } from "../../../constants/filterChoices";
import { useState } from "react";

export const ChoiceForm = ({ isOpen, filter, setFilterValues, filterValues, hid, handleParentClose }) => {
    const [formValue, setFormValue] = useState([]);
    const handleFormChange = (event) => {
        setFormValue(event.target.value);
    }
    const handleSubmit = () => {
        handleParentClose(hid);
        setFilterValues({ ...filterValues, [filter.keyword]: formValue });
    }
    return (
        <Collapse in={isOpen} timeout="auto">
            <Box sx={{ padding: "0.5rem 1rem" }}>
                <FormControl sx={{ maxWidth: '20rem', minWidth: '14rem' }}>
                    <Select multiple autoComplete value={formValue} onChange={handleFormChange} size="small">
                        {filter_choices[filter.choices].map((option) => {
                            return (<MenuItem value={option}>{option}</MenuItem>)
                        })
                        }
                    </Select>
                </FormControl>
                <Button variant="contained" onClick={handleSubmit}>Sumbit</Button>
            </Box>
        </Collapse>

    )
}