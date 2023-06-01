import { MenuItem, TextField } from "@mui/material"
import React from "react"

export const SeatPoolField = (props) => {
	const handleChange = (event) => {
		props.setseatPool(event.target.value)
	}

	return (
		<TextField
			sx={{ maxWidth: "30%" }}
			className='form-dialog'
			label={props.form.title}
			variant='filled'
			select
			disabled={props.genderList.length === 0}
			onChange={handleChange}
			name={props.form.name}
			defaultValue={props.seatPool}
			fullWidth
		>
			{props.genderList &&
				props.genderList.map((option) => (
					<MenuItem key={option.id} value={option.seat_pool}>
						{option.seat_pool}
					</MenuItem>
				))}
		</TextField>
	)
}
