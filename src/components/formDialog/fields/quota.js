import { MenuItem, TextField } from "@mui/material"
import React from "react"

export const QuotaField = (props) => {
	const handleChange = (event) => {
		props.setquota(event.target.value)
	}

	return (
		<TextField
			sx={{ maxWidth: "30%" }}
			className='form-dialog'
			label={props.form.title}
			variant='filled'
			select
			disabled={props.quotaList.data.length === 0}
			onChange={handleChange}
			name={props.form.name}
			defaultValue={props.quota}
			fullWidth
		>
			{props.quotaList.data &&
				props.quotaList.data.quota &&
				props.quotaList.data.quota.map(
					(option) =>
						option && (
							<MenuItem key={option} value={option}>
								{option}
							</MenuItem>
						)
				)}
		</TextField>
	)
}
