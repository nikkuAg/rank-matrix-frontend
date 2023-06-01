import { MenuItem, TextField } from "@mui/material"
import React from "react"

export const RoundField = (props) => {
	const handleChange = (event) => {
		props.setround(event.target.value)
	}

	return (
		<TextField
			sx={{ maxWidth: "30%" }}
			className='form-dialog'
			label={props.form.title}
			variant='filled'
			select
			disabled={props.roundList.data.length === 0}
			onChange={handleChange}
			name={props.form.name}
			defaultValue={props.round}
			fullWidth
		>
			{props.roundList.data &&
				props.roundList.data.map((option) => (
					<MenuItem key={option} value={option.split(" ")[1]}>
						{option}
					</MenuItem>
				))}
		</TextField>
	)
}
