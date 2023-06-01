import { MenuItem, TextField } from "@mui/material"
import React from "react"

export const BranchField = (props) => {
	const handleChange = (event) => {
		props.setbranchId(event.target.value)
	}

	return (
		<TextField
			sx={{ maxWidth: "30%" }}
			className='form-dialog'
			label={props.form.title}
			variant='filled'
			select
			disabled={props.branchList.data.length === 0}
			onChange={handleChange}
			name={props.form.name}
			defaultValue={props.branchId}
			fullWidth
		>
			{props.setInstituteId
				? props.branchOneOneList.data &&
				  props.branchOneOneList.data.map((option) => (
						<MenuItem
							key={option.id}
							value={option.id}
							className='branch-list-form'
						>
							<>
								<span>{option.branch_name}</span>
							</>
						</MenuItem>
				  ))
				: props.branchList.data &&
				  props.branchList.data.map((option) => (
						<MenuItem key={option.id} value={option.id}>
							{option.branch_code}
						</MenuItem>
				  ))}
		</TextField>
	)
}
