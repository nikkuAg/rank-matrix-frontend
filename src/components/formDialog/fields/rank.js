import { TextField } from "@mui/material"
import React from "react"

export const RankField = (props) => {
	const handleChange = (event) => {
		if (event.target.name === "rank") {
			props.setrank(event.target.value)
		} else if (event.target.name === "rankMain") {
			props.setrankMain(event.target.value)
		}
	}

	return (
		<>
			{props.form.optional ? (
				props.choice === "both" && (
					<TextField
						sx={{ maxWidth: "30%" }}
						className='form-dialog'
						label={"JEE Main Rank"}
						variant='filled'
						type={props.form.type}
						name={props.form.name}
						onChange={handleChange}
						fullWidth
						defaultValue={
							props.form.name === "cutoff"
								? props.cutoffVariation
								: props.rankMain
						}
					/>
				)
			) : (
				<TextField
					sx={{ maxWidth: "30%" }}
					className='form-dialog'
					label={
						props.form.title === "Rank" ? props.rankLabel : props.form.title
					}
					variant='filled'
					type={props.form.type}
					name={props.form.name}
					onChange={handleChange}
					defaultValue={
						props.form.name === "cutoff" ? props.cutoffVariation : props.rank
					}
				/>
			)}
		</>
	)
}
