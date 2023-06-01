import { MenuItem, TextField } from "@mui/material"
import React from "react"

export const InstituteTypeField = (props) => {
	const handleChange = (event) => {
		props.setinstituteType(event.target.value)
	}

	return (
		<TextField
			sx={{ maxWidth: "30%" }}
			className='form-dialog'
			label={props.form.title}
			variant='filled'
			select
			disabled={props.instituteTypeList.data.length === 0}
			onChange={handleChange}
			name={props.form.name}
			defaultValue={props.instituteType}
			fullWidth
		>
			{props.instituteTypeList.data &&
				props.instituteTypeList.data.results &&
				props.instituteTypeList.data.results.map((option) => (
					<MenuItem key={option.id} value={option.type}>
						{option.type}
					</MenuItem>
				))}
		</TextField>
	)
}
