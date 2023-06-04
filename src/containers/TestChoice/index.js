import {
	Button,
	Checkbox,
	CircularProgress,
	IconButton,
	Paper,
	Table,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableBody
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import FormDialog from "../../components/formDialog"
import { ConfirmationDialog } from "../../components/confirmationDialog"
import { Header } from "../../components/header"
import {
	AddChoice,
	fileName,
	TestYourChoice,
	toastDuration,
} from "../../constants/general"
import { choicesHeader, download_headers } from "../../constants/tableHeader"
import { removeConfirmationPrompt } from "../../constants/general"
import { fetchTestChoice } from "../../store/actions/prediction"
import { showToast } from "../../store/actions/toast"
import { makeSelectTestChoice } from "../../store/selectors/prediction"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { CSVLink } from "react-csv"
import "../list.scss"
import downloadIcon from "../../images/downloadIcon.svg"
import downloadIconDisabled from "../../images/downloadIconDisabled.svg"
import editIcon from "../../images/editIcon.svg"
import editIconDisabled from "../../images/editIconDisabled.svg"
import { ChoiceTableBody } from "./choiceTableBody"
import { Helmet } from "react-helmet"

const TestChoices = ({
	testChoiceObj,
	testChoiceComponent,
	showToastComponent,
}) => {
	const [instituteType, setinstituteType] = useState("")
	const [instituteId, setinstituteId] = useState(0)
	const [branchId, setbranchId] = useState(0)
	const [openForm, setopenForm] = useState(false)
	const [dataSubmit, setdataSubmit] = useState(false)
	const [choiceFormOpen, setchoiceFormOpen] = useState(false)
	const [isEditing, setisEditing] = useState(false)
	const [seatPool, setseatPool] = useState("")
	const [quota, setquota] = useState("")
	const [category, setcategory] = useState("")
	const [choiceDataSubmit, setchoiceDataSubmit] = useState(false)
	const [selectAll, setselectAll] = useState(false)
	const [showAllCheckboxes, setshowAllCheckboxes] = useState(false)
	const [showRemoveButton, setshowRemoveButton] = useState(false)
	const [openConfirmPrompt, setopenConfirmPrompt] = useState(false)
	const [syncOrder, setsyncOrder] = useState(false)
	const [disableAdd, setdisableAdd] = useState(
		(localStorage.getItem('autoOpenedForm') !== null) ?
			!JSON.parse(localStorage.getItem('autoOpenedForm')) :
			true
	)
	const [cutoff, setcutoff] = useState(
		(localStorage.getItem('cutoff') !== null) ?
			JSON.parse(localStorage.getItem('cutoff')) :
			10
	)
	const [rank, setrank] = useState(
		(localStorage.getItem('rank') !== null) ?
			JSON.parse(localStorage.getItem('rank')) :
			0
	)
	const [rankMain, setrankMain] = useState(
		(localStorage.getItem('rankMain') !== null) ?
			JSON.parse(localStorage.getItem('rankMain')) :
			0
	)
	const [year, setyear] = useState(
		(localStorage.getItem('year') !== null) ?
			JSON.parse(localStorage.getItem('year')) :
			0
	)
	const [round, setround] = useState(
		(localStorage.getItem('round') !== null) ?
			localStorage.getItem('round') :
			0
	)
	const [choice, setchoice] = useState(
		(localStorage.getItem('choice') !== null) ?
			localStorage.getItem('choice') :
			""
	)
	const [testChoices, settestChoices] = useState([])
	const [saveTestChoices, setsaveTestChoices] = useState(
		(localStorage.getItem('saveTestChoices') !== null) ?
			JSON.parse(localStorage.getItem('saveTestChoices')) :
			[]
	)

	const syncInitialChoiceOrder = () => {
		const reorderTestChoice = []
		saveTestChoices.forEach((testChoice, index) => {
			const choiceIndex = testChoices.findIndex(obj => obj.id === testChoice.id)
			if (choiceIndex !== -1) reorderTestChoice.push(testChoices[choiceIndex])
		})
		settestChoices(reorderTestChoice)
	}

	useEffect(() => {
		setopenForm(true)
	}, [])

	useEffect(() => {
		if (dataSubmit) {
			settestChoices([])
			if (choice === localStorage.getItem("choice")) {
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
			}
			localStorage.setItem("cutoff", JSON.stringify(cutoff))
			localStorage.setItem("rank", JSON.stringify(rank))
			localStorage.setItem("rankMain", JSON.stringify(rankMain))
			localStorage.setItem("year", JSON.stringify(year))
			localStorage.setItem("round", round)
			localStorage.setItem("choice", choice)
			if (JSON.parse(localStorage.getItem('autoOpenedForm')) !== true) {
				setdisableAdd(false)
				setchoiceFormOpen(true)
				localStorage.setItem('autoOpenedForm', JSON.stringify(true))
			}
			setdataSubmit(false)

		}
	}, [dataSubmit])

	useEffect(() => {
		if (choiceDataSubmit) {
			const payload = {
				instituteId,
				branchId,
				quota,
				category,
				seatPool,
				rank,
				rankMain,
				cutoff,
				round,
				year,
				choice,
			}
			testChoiceComponent(payload)
			localStorage.setItem("instituteType", instituteType)
			localStorage.setItem("instituteId", instituteId)
			localStorage.setItem("branchId", branchId)
			localStorage.setItem("seatPool", seatPool)
			localStorage.setItem("quota", quota)
			localStorage.setItem("category", category)
			setchoiceDataSubmit(false)
			if (isEditing) {
				setisEditing(false)
			}
		}
	}, [choiceDataSubmit])

	useEffect(() => {
		if (testChoiceObj.data.opening_rank) {
			if (!testChoices.find((obj) => (obj !== null) && (obj.id === testChoiceObj.data.id))) {
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
				const insertIndex = saveTestChoices.findIndex(
					testChoice => (testChoice !== null && testChoice.id === testChoiceObj.data.id)
				)
				// testChoices[insertIndex] = choice
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
			} else {
				if (!isEditing) {
					showToastComponent(
						"You have already added this choice",
						"error",
						toastDuration
					)
				}
			}
		}
	}, [testChoiceObj])

	useEffect(() => {
		if ((!syncOrder) && testChoices.length === saveTestChoices.length) {
			syncInitialChoiceOrder()
			setsyncOrder(true)
		}
	}, [testChoices])

	useEffect(() => {
		localStorage.setItem('saveTestChoices', JSON.stringify(saveTestChoices))
	}, [saveTestChoices])

	useEffect(() => {
		setshowRemoveButton(showAllCheckboxes)
	}, [showAllCheckboxes])

	const checkboxOnMouseEnter = (id) => {
		settestChoices(
			testChoices.map(testChoice => {
				if (testChoice !== null && testChoice.id === id) testChoice.showCheckbox = true
				return testChoice
			})
		)
	}

	const checkboxOnMouseLeave = (id) => {
		settestChoices(
			testChoices.map(testChoice => {
				if (testChoice !== null && testChoice.id === id) testChoice.showCheckbox = false
				return testChoice
			})
		)
	}

	const checkboxOnChange = (id, event = null) => {
		let activateAllCheckboxes = false
		let selectAllCheckboxes = true
		settestChoices(
			testChoices.map(testChoice => {
				if (testChoice.id === id) {
					testChoice.selected = event === null ? !testChoice.selected : event.target.checked
				} else {
					testChoice.selected = selectAll ? true : testChoice.selected
				}
				activateAllCheckboxes = activateAllCheckboxes || testChoice.selected
				selectAllCheckboxes = selectAllCheckboxes && testChoice.selected
				return testChoice
			})
		)
		setselectAll(selectAllCheckboxes)
		setshowAllCheckboxes(activateAllCheckboxes)
		setshowRemoveButton(activateAllCheckboxes)
	}

	const selectAllCheckboxOnChange = (event) => {
		setselectAll(event.target.checked)
	}

	const choiceButtonClick = () => {
		if (!showRemoveButton) setchoiceFormOpen(true)
	}

	const removeButtonClick = () => {
		setopenConfirmPrompt(true)
	}

	const cancelRemoveChoices = () => {
		settestChoices(
			testChoices.map(testChoice => {
				testChoice.selected = false
				testChoice.showCheckbox = false
				return testChoice
			})
		)
		setselectAll(false)
		setshowAllCheckboxes(false)
		setshowRemoveButton(false)
		setopenConfirmPrompt(false)
	}

	const confirmRemoveChoices = () => {
		const updateSaveChoices = []
		settestChoices(testChoices.filter(testChoice => {
			if (testChoice.selected || selectAll) return false

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
		setselectAll(false)
		setshowAllCheckboxes(false)
		setshowRemoveButton(false)
		setopenConfirmPrompt(false)
	}

	const editDetailButtonClick = () => {
		if (!showRemoveButton) {
			setisEditing(true)
			setopenForm(true)
		}
	}

	const downloadClick = () => {
		if (!showRemoveButton) {
			showToastComponent(
				"Your choices have been exported",
				"success",
				toastDuration
			)
		}
	}

	const onChoiceDragEnd = (result) => {
		if (result.destination.index !== result.source.index) {
			let removeIndex = result.source.index
			let insertIndex = result.destination.index
			if (result.destination.index < result.source.index) removeIndex++
			if (result.destination.index > result.source.index) insertIndex++

			testChoices.splice(insertIndex, 0, testChoices[result.source.index])
			const updateSaveChoices = []

			settestChoices(testChoices.filter((testChoice, index) => {
				if (index === removeIndex) return false

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
		<div className='list-container'>
			<Helmet>
				<title>Rank Matrix | Test your Choices</title>
				<meta name="keywords" content="Choice filling, Reorder choices, Preferred choices, 
					Rank-based choice order, College and branch selection, Smart choice order generator, 
					Best choice sequence" />
			</Helmet>
			<Header heading='Test your JoSAA Choices' />
			<FormDialog
				openForm={openForm}
				setopenForm={setopenForm}
				predictionData={TestYourChoice}
				setCutoff={setcutoff}
				setRank={setrank}
				setRankMain={setrankMain}
				setYear={setyear}
				setRound={setround}
				setChoice={setchoice}
				setdataSubmit={setdataSubmit}
				isEditing={isEditing}
			/>
			<FormDialog
				openForm={choiceFormOpen}
				setopenForm={setchoiceFormOpen}
				predictionData={AddChoice}
				setInstituteType={setinstituteType}
				setBranchId={setbranchId}
				setInstituteId={setinstituteId}
				setCategory={setcategory}
				setSeatPool={setseatPool}
				setQuota={setquota}
				setdataSubmit={setchoiceDataSubmit}
				fetchinstituteTypeDetail={choiceFormOpen}
			/>
			<ConfirmationDialog
				open={openConfirmPrompt}
				onClose={() => setopenConfirmPrompt(false)}
				title={removeConfirmationPrompt.title}
				content={removeConfirmationPrompt.content}
				confirmButtonText={removeConfirmationPrompt.confirmButtonText}
				cancelAction={cancelRemoveChoices}
				confirmAction={confirmRemoveChoices}
			/>
			<div className='table-container'>
				<div className='filters between choices'>
					<div>
						<Button
							disabled={disableAdd || showRemoveButton}
							onClick={choiceButtonClick}
							className='choice-button add-choice'
						>
							Add Your Choice
						</Button>
						{showRemoveButton && (
							<Button
								disabled={!showRemoveButton}
								onClick={removeButtonClick}
								className='choice-button add-choice'
							>
								Remove
							</Button>
						)}
					</div>
					<div>
						<IconButton
							disabled={showRemoveButton}
							className="choice-button icon"
							onClick={editDetailButtonClick}
						>
							<img src={showRemoveButton ? editIconDisabled : editIcon} />
						</IconButton>
						{testChoices.length !== 0 && (
							<CSVLink
								disabled={showRemoveButton}
								data={testChoices.filter(testChoice => testChoice !== null)}
								headers={download_headers}
								filename={fileName}
								target='_blank'
								onClick={downloadClick}
							>
								<IconButton
									disabled={showRemoveButton}
									className="choice-button icon"
								>
									<img src={showRemoveButton ? downloadIconDisabled : downloadIcon} />
								</IconButton>
							</CSVLink>
						)}
					</div>
				</div>
				{testChoiceObj.loading ? (
					<CircularProgress />
				) : (
					testChoices.length !== 0 && (
						<>
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 650 }}>
									<TableHead>
										<TableRow>
											<TableCell className='noto-sans tablehead-checkbox-column' align="center">
												<Checkbox
													checked={selectAll}
													onChange={selectAllCheckboxOnChange}
													disabled={!showAllCheckboxes}
													className={showAllCheckboxes ? 'active-tablehead-checkbox' : 'inactive-tablehead-checkbox'}
												/>
											</TableCell>
											{choicesHeader.map((header, index) => (
												<TableCell key={index}>{header.label}</TableCell>
											))}
										</TableRow>
									</TableHead>
									<ChoiceTableBody
										testChoices={testChoices}
										selectAll={selectAll}
										showAllCheckboxes={showAllCheckboxes}
										settestChoices={settestChoices}
										setsaveTestChoices={setsaveTestChoices}
										setselectAll={setselectAll}
										setshowAllCheckboxes={setshowAllCheckboxes}
									/>
								</Table>
							</TableContainer>
						</>
					)
				)}
			</div>
		</div>
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
		showToastComponent: (message, type, duration) =>
			dispatch(showToast(message, type, duration)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TestChoices)
