import { MenuItem, TextField } from "@mui/material"
import React from "react"

export const InstituteField = (props) => {
	const handleChange = (event) => {
		props.setinstituteId(event.target.value)
	}

	return (
		<TextField
			sx={{ maxWidth: "30%" }}
			className='form-dialog'
			label={props.form.title}
			variant='filled'
			select
			disabled={props.instituteList.data.length === 0}
			onChange={handleChange}
			name={props.form.name}
			defaultValue={props.instituteId}
			fullWidth
		>
			{props.instituteList.data &&
				props.instituteList.data.map((option) => (
					<MenuItem key={option.id} value={option.id}>
						{option.name}
					</MenuItem>
				))}
		</TextField>
	)
}
