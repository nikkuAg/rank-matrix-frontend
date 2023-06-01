import { Box, Typography, TextField, Button, Slider, Paper, Collapse } from "@mui/material"
import { useState } from "react"

export const NumberForm = ({ isOpen, filter, filterValues, setFilterValues, hid, handleParentClose }) => {
    const [value, setValue] = useState([filter.min, filter.max]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const handleSubmit = () => {
        handleParentClose(hid);
        setFilterValues({ ...filterValues, [filter.min_keyword]: value[0], [filter.max_keyword]: value[1] });
    }
    return (
        <Collapse in={isOpen} timeout="auto">
            <Box sx={{ width: 300, padding: "0.5rem 1rem" }} >
                <Slider
                    value={value}
                    max={filter.max}
                    min={filter.min}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                />
            </Box>
            <Button variant="contained" onClick={handleSubmit}>Apply</Button>
        </Collapse>
    )
}