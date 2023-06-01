import { MenuItem, TextField } from "@mui/material"
import React from "react"

export const OpeningClosingField = (props) => {
	const handleChange = (event) => {
		props.setoption(event.target.value)
	}

	return (
		<>
			<TextField
				sx={{ maxWidth: "30%" }}
				className='form-dialog'
				label={props.form.title}
				variant='filled'
				select
				disabled={props.optionsList.length === 0}
				onChange={handleChange}
				name={props.form.name}
				defaultValue={props.option}
				fullWidth
			>
				{props.optionsList.map((option) => (
					<MenuItem key={option} value={option.split(" ")[0].toLowerCase()}>
						{option}
					</MenuItem>
				))}
			</TextField>
		</>
	)
}
