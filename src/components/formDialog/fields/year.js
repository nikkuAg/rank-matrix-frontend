import { MenuItem, TextField } from "@mui/material"
import React from "react"

export const YearField = (props) => {
	const handleChange = (event) => {
		props.setyear(event.target.value)
	}

	return (
		<TextField
			sx={{ maxWidth: "30%" }}
			className='form-dialog'
			label={props.form.title}
			variant='filled'
			select
			disabled={props.yearList.length === 0}
			onChange={handleChange}
			name={props.form.name}
			defaultValue={props.year === 0 ? null : props.year}
			fullWidth
		>
			{props.yearList.map((option) => (
				<MenuItem key={option} value={option}>
					{option}
				</MenuItem>
			))}
		</TextField>
	)
}
