import {
	TableBody,
} from "@mui/material"
import {
	DragDropContext,
	Draggable,
	Droppable
} from "react-beautiful-dnd"
import React from "react"
import { ChoiceRow } from "../choiceRow"

export const ChoiceTableBody = ({
    testChoices,
    selectAll,
    showAllCheckboxes,
    settestChoices,
    setsaveTestChoices,
    setselectAll,
    setshowAllCheckboxes,
}) => {

    const onChoiceDragEnd = (result) => {
		if(result.destination.index!==result.source.index){
			let removeIndex = result.source.index
			let insertIndex = result.destination.index
			if(result.destination.index < result.source.index) removeIndex++
			if(result.destination.index > result.source.index) insertIndex++

			testChoices.splice(insertIndex, 0, testChoices[result.source.index])
			const updateSaveChoices = []
			
			settestChoices(testChoices.filter((testChoice,index) => {
				if(index===removeIndex) return false

				const saveChoice = {
					institute_id: testChoice.institute_id,
					branch_id: testChoice.branch_id,
					quota: testChoice.quota,
					seat_pool: testChoice.seat_pool,
					category: testChoice.category,
					id: testChoice.id,
				}
				updateSaveChoices.push(saveChoice)
				return true
			}))
			setsaveTestChoices(updateSaveChoices)
		}
	}

    return (
        <DragDropContext 
            onDragEnd={onChoiceDragEnd}
        >
            <Droppable droppableId='droppable'>
                {(provided) => (
                    <TableBody 
                        className='prediction' 
                        ref={provided.innerRef}
                    >
                        {testChoices.map((choice, index) => (
                            choice!==null &&
                            <Draggable 
                                key={choice.id} 
                                draggableId={choice.id}
                                index={index}
                            >
                                {(provided,snapshot) => (
                                    <ChoiceRow 
                                    provided={provided}
                                    snapshot={snapshot}
                                    choice={choice}
                                    testChoices={testChoices}
                                    selectAll={selectAll}
                                    showAllCheckboxes={showAllCheckboxes}
                                    settestChoices={settestChoices}
                                    setselectAll={setselectAll}
                                    setshowAllCheckboxes={setshowAllCheckboxes}
                                    />
                                )}
                            </Draggable>
                        ))}
                    </TableBody>
                )}
            </Droppable>
        </DragDropContext>
    )
}
