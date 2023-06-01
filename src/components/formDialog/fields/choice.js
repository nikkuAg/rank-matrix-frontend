import { MenuItem, TextField } from "@mui/material"
import React from "react"
import { useDispatch } from "react-redux"
import { toastDuration } from "../../../constants/general"
import { showToast } from "../../../store/actions/toast"

export const ChoiceField = (props) => {
	const dispatch = useDispatch()

	const handleChange = (event) => {
		if (props.isEditing) {
			if (event.target.value !== props.choiceEdit) {
				dispatch(
					showToast(
						"All the choices you filled will be removed",
						"warning",
						toastDuration
					)
				)
			}
		}
		props.setchoice(event.target.value)
	}

	return (
		<TextField
			sx={{ maxWidth: "30%" }}
			className='form-dialog'
			label={props.form.title}
			variant='filled'
			select
			disabled={props.choicesList.length === 0}
			onChange={handleChange}
			name={props.form.name}
			defaultValue={props.choice}
			fullWidth
		>
			{props.choicesList.map((option, index) => (
				<MenuItem key={index} value={option.value}>
					{option.title}
				</MenuItem>
			))}
		</TextField>
	)
}
