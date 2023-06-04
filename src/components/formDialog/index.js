import React, { useEffect, useState } from "react"
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Slide,
	MenuItem,
	Select,
	Chip,
	Divider,
	Typography,
} from "@mui/material"
import "./index.scss"
import {
	toastDuration,
	optionsList,
	choicesList,
} from "../../constants/general"
import {
	makeSelectBranchList,
	makeSelectBranchOneOneList,
	makeSelectCategory,
	makeSelectGender,
	makeSelectInstituteList,
	makeSelectInstituteType,
	makeSelectQuota,
	makeSelectRound,
	makeSelectYear,
} from "../../store/selectors/form"
import { connect } from "react-redux"
import {
	fetchBranchList,
	fetchBranchOneOneList,
	fetchInstituteList,
	fetchInstituteType,
	fetchQuota,
	fetchRound,
} from "../../store/actions/form"
import { showToast } from "../../store/actions/toast"
import { useLocation } from "react-router-dom"
import { RankField } from "./fields/rank"
import { OpeningClosingField } from "./fields/openingClosing"
import { YearField } from "./fields/year"
import { RoundField } from "./fields/round"
import { InstituteTypeField } from "./fields/instituteType"
import { SeatPoolField } from "./fields/seatPool"
import { CategoryField } from "./fields/category"
import { QuotaField } from "./fields/quota"
import { InstituteField } from "./fields/instituteList"
import { BranchField } from "./fields/branchList"
import { ChoiceField } from "./fields/choice"
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})

const FormDialog = ({
	openForm,
	setopenForm,
	predictionData,
	yearList,
	roundListComponent,
	roundList,
	instituteTypeList,
	instituteTypeComponent,
	instituteListComponent,
	instituteList,
	predictionList,
	setPredictionType,
	branchListComponent,
	branchList,
	branchOneOneListComponent,
	branchOneOneList,
	genderList,
	categoryList,
	quotaListComponent,
	quotaList,
	setInstituteType,
	setCategory,
	setCutoff,
	setSeatPool,
	setQuota,
	setRank,
	setRankMain,
	setYear,
	setRound,
	setOption,
	setInstituteId,
	setBranchId,
	setChoice,
	setdataSubmit,
	fetchinstituteTypeDetail,
	isEditing,
	showToastComponent,
}) => {
	const [open, setOpen] = useState(openForm)
	const [year, setyear] = useState(parseInt(localStorage.getItem("year")) || "2022")
	const [instituteType, setinstituteType] = useState(
		localStorage.getItem("instituteType") || ""
	)
	const [category, setcategory] = useState(
		localStorage.getItem("category") || ""
	)
	const [cutoffVariation, setcutoffVariation] = useState(
		parseInt(localStorage.getItem("cutoff")) || 10
	)
	const [seatPool, setseatPool] = useState(
		localStorage.getItem("seatPool") || ""
	)
	const [quota, setquota] = useState(localStorage.getItem("quota") || "")
	const [rank, setrank] = useState(parseInt(localStorage.getItem("rank")) || "")
	const [rankMain, setrankMain] = useState(
		parseInt(localStorage.getItem("rankMain")) || ""
	)
	const [option, setoption] = useState(
		localStorage.getItem("option") || "closing"
	)
	const [round, setround] = useState(localStorage.getItem("round") || "6")
	const [choice, setchoice] = useState(localStorage.getItem("choice") || "")
	const [choiceEdit, setchoiceEdit] = useState(localStorage.getItem("choice"))
	const [instituteId, setinstituteId] = useState(
		localStorage.getItem("instituteId") || 0
	)
	const [branchId, setbranchId] = useState(
		localStorage.getItem("branchId") || 0
	)
	const [rankLabel, setrankLabel] = useState("Rank")

	const location = useLocation()

	useEffect(() => {
		if (fetchinstituteTypeDetail) {
			setchoice(localStorage.getItem("choice"))
			if (location.pathname === "/choices") {
				if (choice !== "") {
					const payload = {
						choice,
					}
					instituteTypeComponent(payload)
				}
			}
		}
	}, [fetchinstituteTypeDetail, choice])

	useEffect(() => {
		setOpen(openForm)
	}, [openForm])

	useEffect(() => {
		if (year !== 0) {
			const payload = {
				year,
			}
			setround(localStorage.getItem("round") || 6)
			roundListComponent(payload)
		}
	}, [year])

	useEffect(() => {
		if (setInstituteId) {
			const payload = {
				instituteId,
			}
			branchOneOneListComponent(payload)
			const quotaPayload = {
				institute_code: instituteId,
			}
			quotaListComponent(quotaPayload)
		}
	}, [instituteId])

	useEffect(() => {
		if (instituteType !== "") {
			const payload = {
				institute_type: instituteType,
			}
			if (!setInstituteId) {
				setquota("")
				quotaListComponent(payload)
			}
			if (setInstituteId) {
				instituteListComponent(payload)
			}
			if (setBranchId) {
				branchListComponent(payload)
			}
			if (instituteType === "IIT") {
				setrankLabel("JEE Advanced rank")
			} else {
				setrankLabel("JEE Main rank")
			}
		}
	}, [instituteType])

	useEffect(() => {
		if (choice === "mains") {
			setrankLabel("JEE Main Rank")
		} else {
			setrankLabel("JEE Advanced Rank")
		}
	}, [choice])

	const handleClose = () => {
		setOpen(false)
		setopenForm(false)
	}

	const handleSubmit = () => {
		let error = 0
		if (setInstituteType) {
			if (instituteType.length === 0) {
				error = 1
			} else {
				setInstituteType(instituteType)
			}
		}
		if (setCategory) {
			if (category.length === 0) {
				error = 1
			} else {
				setCategory(category)
			}
		}
		if (setSeatPool) {
			if (seatPool.length === 0) {
				error = 1
			} else {
				setSeatPool(seatPool)
			}
		}
		if (setQuota) {
			if (quota.length === 0) {
				error = 1
			} else {
				setQuota(quota)
			}
		}
		if (setRank) {
			if (rank === 0 || rank.length === 0) {
				error = 1
			} else {
				setRank(rank)
			}
		}
		if (setRankMain) {
			if (choice === "both") {
				if (rankMain === 0 || rankMain.length === 0) {
					error = 1
				} else {
					setRankMain(rankMain)
				}
			}
		}
		if (setYear) {
			if (year === 0 || year.length === 0) {
				error = 1
			} else {
				setYear(year)
			}
		}
		if (setRound) {
			if (round.length === 0) {
				error = 1
			} else {
				setRound(round)
			}
		}
		if (setOption) {
			if (option.length === 0) {
				error = 1
			} else {
				setOption(option)
			}
		}
		if (setInstituteId) {
			if (instituteId === 0 || instituteId.length === 0) {
				error = 1
			} else {
				setInstituteId(instituteId)
			}
		}
		if (setBranchId) {
			if (branchId === 0 || branchId.length === 0) {
				error = 1
			} else {
				setBranchId(branchId)
			}
		}
		if (error !== 0) {
			showToastComponent(
				"Please fill all the details",
				"warning",
				toastDuration
			)
		} else {
			if (setChoice) {
				setChoice(choice)
			}
			if (setdataSubmit) {
				setdataSubmit(true)
			}
			if (setCutoff) {
				setCutoff(cutoffVariation)
			}
			handleClose()
		}
	}

	const handlePredictionType = (value) => {
		setPredictionType(value)
	}

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
				// maxWidth='lg'
				className='form-dialog-container'
			>
				<DialogTitle className='form-title'>
					{predictionList ? (
						<>
							<div>
								Details for
							</div>
							{
								predictionList.map((item, index) => {
									return (
										<Chip
											label={item.title}
											value={item.value}
											variant={`${predictionData.value === item.value ? "" : "outlined"}`}
											onClick={() => handlePredictionType(item.value)}
										/>
									)

								})
							}
						</>
					) : (
						predictionData.formTitle
					)}
				</DialogTitle>
				<Divider />
				<DialogContent className='form-container'>
					{predictionData.formData.map((form) => {
						if (form.type !== "select") {
							return (
								<RankField
									form={form}
									cutoffVariation={cutoffVariation}
									rank={rank}
									rankMain={rankMain}
									choice={choice}
									rankLabel={rankLabel}
									setrank={setrank}
									setrankMain={setrankMain}
									setCutoff={setcutoffVariation}
								/>
							)
						} else {
							if (form.list === "option") {
								return (
									<OpeningClosingField
										form={form}
										optionsList={optionsList}
										option={option}
										setoption={setoption}
									/>
								)
							} else if (form.list === "year") {
								return (
									<YearField
										form={form}
										year={year}
										yearList={yearList}
										setyear={setyear}
									/>
								)
							} else if (form.list === "round") {
								return (
									<RoundField
										form={form}
										round={round}
										roundList={roundList}
										setround={setround}
									/>
								)
							} else if (form.list === "institute_type") {
								return (
									<InstituteTypeField
										form={form}
										instituteTypeList={instituteTypeList}
										instituteType={instituteType}
										setinstituteType={setinstituteType}
									/>
								)
							} else if (form.list === "seatPool") {
								return (
									<SeatPoolField
										form={form}
										genderList={genderList}
										setseatPool={setseatPool}
										seatPool={seatPool}
									/>
								)
							} else if (form.list === "category") {
								return (
									<CategoryField
										form={form}
										categoryList={categoryList}
										setcategory={setcategory}
										category={category}
									/>
								)
							} else if (form.list === "quota") {
								return (
									<QuotaField
										form={form}
										quotaList={quotaList}
										setquota={setquota}
										quota={quota}
									/>
								)
							} else if (form.list === "institute_list") {
								return (
									<InstituteField
										form={form}
										instituteList={instituteList}
										setinstituteId={setinstituteId}
										instituteId={instituteId}
									/>
								)
							} else if (form.list === "branch_list") {
								return (
									<BranchField
										form={form}
										branchList={branchList}
										branchOneOneList={branchOneOneList}
										setInstituteId={setInstituteId}
										branchId={branchId}
										setbranchId={setbranchId}
									/>
								)
							} else if (form.list === "choice_option") {
								return (
									<ChoiceField
										form={form}
										choicesList={choicesList}
										choice={choice}
										isEditing={isEditing}
										choiceEdit={choiceEdit}
										setchoice={setchoice}
									/>
								)
							}
						}
					})}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSubmit} variant="contained">Submit</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		yearList: makeSelectYear(state),
		roundList: makeSelectRound(state),
		instituteTypeList: makeSelectInstituteType(state),
		genderList: makeSelectGender(state),
		categoryList: makeSelectCategory(state),
		quotaList: makeSelectQuota(state),
		instituteList: makeSelectInstituteList(state),
		branchList: makeSelectBranchList(state),
		branchOneOneList: makeSelectBranchOneOneList(state),
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		instituteTypeComponent: (payload) => dispatch(fetchInstituteType(payload)),
		roundListComponent: (payload) => dispatch(fetchRound(payload)),
		quotaListComponent: (payload) => dispatch(fetchQuota(payload)),
		instituteListComponent: (payload) => dispatch(fetchInstituteList(payload)),
		branchListComponent: (payload) => dispatch(fetchBranchList(payload)),
		branchOneOneListComponent: (payload) =>
			dispatch(fetchBranchOneOneList(payload)),
		showToastComponent: (message, type, duration) =>
			dispatch(showToast(message, type, duration)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog)
