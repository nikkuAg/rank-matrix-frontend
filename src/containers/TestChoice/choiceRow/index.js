import {
	Checkbox,
	TableCell,
	TableRow,
} from "@mui/material"
import React from "react"

export const ChoiceRow = ({
    provided,
    snapshot,
    choice,
    testChoices,
    selectAll,
    showAllCheckboxes,
    settestChoices,
    setselectAll,
    setshowAllCheckboxes
}) => {

    const checkboxOnMouseEnter = (id) => {
		settestChoices(
			testChoices.map(testChoice => {
				if(testChoice!==null && testChoice.id===id) testChoice.showCheckbox=true
				return testChoice
			})
		)
	}

	const checkboxOnMouseLeave = (id) => {
		settestChoices(
			testChoices.map(testChoice => {
				if(testChoice!==null && testChoice.id===id) testChoice.showCheckbox=false
				return testChoice
			})
		)
	}

	const checkboxOnChange = (id, event=null) => {
		let activateAllCheckboxes = false
		let selectAllCheckboxes = true
		settestChoices(
			testChoices.map(testChoice => {
				if (testChoice.id===id) {
					testChoice.selected = event===null ? !testChoice.selected : event.target.checked
				}else {
					testChoice.selected = selectAll ? true : testChoice.selected
				}
				activateAllCheckboxes = activateAllCheckboxes || testChoice.selected
				selectAllCheckboxes = selectAllCheckboxes && testChoice.selected
				return testChoice
			})
		)
		setselectAll(selectAllCheckboxes)
		setshowAllCheckboxes(activateAllCheckboxes)
	}

    return (
        <TableRow
            sx={{
                "&:last-child td, &:last-child th": { border: 0 },
            }}
            className={snapshot.isDragging ? `${choice.color} rank` : `${choice.color} rank`}
            key={choice.id}
            onMouseEnter={() => checkboxOnMouseEnter(choice.id)}
            onMouseLeave={() => checkboxOnMouseLeave(choice.id)}
            onClick={() => checkboxOnChange(choice.id)}
            ref={provided.innerRef}	
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
            <TableCell 
            className='noto-sans checkbox-column'
            align="center"
            >
                <Checkbox 
                    checked={choice.selected || selectAll}
                    onChange={(event) => checkboxOnChange(choice.id, event)}
                    disabled={!(choice.showCheckbox || showAllCheckboxes)}
                    className={(choice.showCheckbox || showAllCheckboxes) ? 'active-checkbox' : 'inactive-checkbox'}
                />
            </TableCell>
            <TableCell className='noto-sans'>
                {choice.institute_type}
            </TableCell>
            <TableCell className='noto-sans'>
                {choice.institute_name}
            </TableCell>
            <TableCell className='noto-sans'>
                {choice.branch_name}
            </TableCell>
            <TableCell className='noto-sans'>
                {choice.category}
            </TableCell>
            <TableCell className='noto-sans'>
                {choice.quota}
            </TableCell>
            <TableCell className='noto-sans'>
                {choice.seat_pool}
            </TableCell>
            <TableCell className='noto-sans'>
                {choice.opening_rank}
            </TableCell>
            <TableCell className='noto-sans'>
                {choice.closing_rank}
            </TableCell>
        </TableRow>
    )
}
