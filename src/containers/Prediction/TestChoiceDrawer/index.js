import { Drawer, Box, TableBody, TableRow, TableCell, Typography, Chip, Card, IconButton } from "@mui/material"
import { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { makeSelectTestChoice } from "../../../store/selectors/prediction"
import { fetchTestChoice } from "../../../store/actions/prediction"
import { connect } from "react-redux"
import { showToast } from "../../../store/actions/toast"
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CloseIcon from '@mui/icons-material/Close';
import "./index.scss"

const TestChoiceDrawer = ({ testChoiceObj, testChoiceComponent, showToastComponent, rank, rankMain, cutoff, year, round, choice, open, setOpen, setsaveTestChoices, saveTestChoices }) => {
    const [testChoices, settestChoices] = useState([])
    const handleClose = () => {
        setOpen(false);
    }
    const syncInitialChoiceOrder = () => {
        const reorderTestChoice = []
        saveTestChoices.forEach((testChoice, index) => {
            const choiceIndex = testChoices.findIndex(obj => obj.id === testChoice.id)
            if (choiceIndex !== -1) reorderTestChoice.push(testChoices[choiceIndex])
        })
        settestChoices(reorderTestChoice)
    }
    useEffect(() => {
        if (testChoices.length === saveTestChoices.length) {
            syncInitialChoiceOrder()
        }
    }, [saveTestChoices.length])
    const onChoiceDragEnd = (result) => {
        if (result.destination.index !== result.source.index) {
            let removeIndex = result.source.index
            let insertIndex = result.destination.index
            if (result.destination.index < result.source.index) removeIndex++
            if (result.destination.index > result.source.index) insertIndex++

            testChoices.splice(insertIndex, 0, testChoices[result.source.index])
            const updateSaveChoices = []
            settestChoices(testChoices.filter((testChoice, index) => {
                if (index === removeIndex || testChoice == null) return false

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
            localStorage.setItem('saveTestChoices', JSON.stringify(updateSaveChoices))

        }
    }

    useEffect(() => {
        settestChoices([]);
        saveTestChoices.forEach((element) => {
            const payload = {
                instituteId: element.institute_id,
                branchId: element.branch_id,
                quota: element.quota,
                category: element.category,
                seatPool: element.seat_pool,
                rank,
                rankMain,
                cutoff,
                round,
                year,
                choice,
            }
            testChoiceComponent(payload)
        })
    }, [year, round, saveTestChoices.length])
    useEffect(() => {
        if (testChoiceObj.data.opening_rank) {
            const choice = {
                institute_id: testChoiceObj.data.institute_detail.id,
                institute_type: testChoiceObj.data.institute_detail.type,
                institute_name: testChoiceObj.data.institute_detail.name,
                branch_id: testChoiceObj.data.branch_detail.id,
                branch_name: testChoiceObj.data.branch_detail.name,
                quota: testChoiceObj.data.quota,
                seat_pool: testChoiceObj.data.seat_pool,
                category: testChoiceObj.data.category,
                opening_rank: testChoiceObj.data.opening_rank || "-",
                closing_rank: testChoiceObj.data.closing_rank || "-",
                color: testChoiceObj.data.color,
                id: testChoiceObj.data.id,
                selected: false,
                showCheckbox: false
            }
            settestChoices((prevChoice) => [...prevChoice, choice])
            if (!saveTestChoices.find((obj) => obj.id === testChoiceObj.data.id)) {
                const saveChoice = {
                    institute_id: testChoiceObj.data.institute_detail.id,
                    branch_id: testChoiceObj.data.branch_detail.id,
                    quota: testChoiceObj.data.quota,
                    seat_pool: testChoiceObj.data.seat_pool,
                    category: testChoiceObj.data.category,
                    id: testChoiceObj.data.id,
                }
                setsaveTestChoices((prevChoice) => [...prevChoice, saveChoice])
            }
            // syncInitialChoiceOrder()
        }

    }, [testChoiceObj])
    // const handleRemoveChoice = (obj) => {
    //     let modifiedarray = saveTestChoices;

    //     const findIndex = modifiedarray.findIndex(a => a.id === obj.id)

    //     findIndex !== -1 && modifiedarray.splice(findIndex, 1);
    //     setsaveTestChoices(modifiedarray);
    //     localStorage.setItem('saveTestChoices', JSON.stringify(modifiedarray))
    // }
    // useEffect(() => {
    //     console.log("sssschanged")
    //     console.log(saveTestChoices)
    // }, [saveTestChoices.length, saveTestChoices])

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={handleClose}
            className="choicesDrawer"
        >
            <IconButton className="closeIconButton" onClick={handleClose}>
                <CloseIcon className="closeIcon" />
            </IconButton>
            <Box className="choicesDrawerBox">
                <Box className="spotlight"><Typography>JoSAA List</Typography></Box>
                {testChoices.length > 0 ? (
                    <DragDropContext
                        onDragEnd={onChoiceDragEnd}
                    >
                        <Droppable droppableId='droppable'>
                            {(provided) => {
                                return (
                                    <div
                                        className='choiceElementDropBox'
                                        ref={provided.innerRef}
                                    >
                                        {testChoices.map((row, index) => (
                                            row !== null &&
                                            <Draggable draggableId={row.id} index={index} key={row.id}>
                                                {(provided, snapshot) => {
                                                    return (
                                                        <div
                                                            className={snapshot.isDragging ? `dragging choiceElement` : ` choiceElement`}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}>
                                                            <DragIndicatorIcon className="dragIcon" />
                                                            <Box className="details">
                                                                {/* <IconButton className="removeIconButton" onClick={() => {
                                                                    handleRemoveChoice(row);
                                                                }}>
                                                                    <CloseIcon className="removeIcon" />
                                                                </IconButton> */}
                                                                <Typography className="instituteName">{row.institute_type}-{row.institute_name}</Typography>
                                                                <Typography>{row.branch_name}</Typography>
                                                                <Box>
                                                                    <Chip label={row.category} />
                                                                    <Chip label={row.seat_pool} />
                                                                    <Chip label={row.quota} />
                                                                </Box>
                                                            </Box>
                                                        </div>
                                                    )
                                                }}

                                            </Draggable>

                                        ))}
                                    </div>
                                )
                            }}
                        </Droppable>
                    </DragDropContext>
                ) : (<Typography className="emptyWarning">No choices added yet.Add choices to see your JoSSA list</Typography>)}
            </Box>

        </Drawer >
    )
}
export const mapStateToProps = (state) => {
    return {
        testChoiceObj: makeSelectTestChoice(state),
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        testChoiceComponent: (payload) => dispatch(fetchTestChoice(payload)),
        showToastComponent: (message, type, duration) => dispatch(showToast(message, type, duration)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestChoiceDrawer)
