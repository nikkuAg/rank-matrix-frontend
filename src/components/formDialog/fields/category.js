import { MenuItem, TextField } from "@mui/material"
import React from "react"

export const CategoryField = (props) => {
	const handleChange = (event) => {
		props.setcategory(event.target.value)
	}

	return (
		<TextField
			sx={{ maxWidth: "30%" }}
			className='form-dialog'
			label={props.form.title}
			variant='filled'
			select
			disabled={props.categoryList.length === 0}
			onChange={handleChange}
			name={props.form.name}
			defaultValue={props.category}
			fullWidth
		>
			{props.categoryList &&
				props.categoryList.map((option) => (
					<MenuItem key={option.id} value={option.category}>
						{option.category}
					</MenuItem>
				))}
		</TextField>
	)
}
