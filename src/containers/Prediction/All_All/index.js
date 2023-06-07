import {
	Button,
	CircularProgress,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import FormDialog from "../../../components/formDialog/index"
import { Header } from "../../../components/header"
import { TableInfo } from "../../../components/tableHeader"
import {
	colorCode,
	LightRankTooltip,
	PredictionList,
} from "../../../constants/general"
import { fetchAllAllPrediction } from "../../../store/actions/prediction"
import { makeSelectAllAllPrediction } from "../../../store/selectors/prediction"
import "../../list.scss"
import AllBranchOneCollegePrediction from "../All_One"
import OneBranchAllInstitutesPrediction from "../One_All"
import OneBranchOneInstitutesPrediction from "../One_One"
import { YearField } from "../../../components/formDialog/fields/year"
import { RoundField } from "../../../components/formDialog/fields/round"
import { RankField } from "../../../components/formDialog/fields/rank"
import { makeSelectRound } from "../../../store/selectors/form"
import { makeSelectYear } from "../../../store/selectors/form"
import TestChoiceDrawer from "../TestChoiceDrawer"
import AddIcon from '@mui/icons-material/Add';

import { Helmet } from "react-helmet"

const AllBranchAllCollegePrediction = ({
	predictionObj,
	predictionComponent,
	roundList,
	yearList
}) => {
	const [predictionType, setpredictionType] = useState("all_all")
	const [instituteType, setinstituteType] = useState("IIT")
	const [category, setcategory] = useState("")
	const [cutoff, setcutoff] = useState(10)
	const [seatPool, setseatPool] = useState("")
	const [quota, setquota] = useState("")
	const [rank, setrank] = useState(0)
	const [option, setoption] = useState("")
	const [year, setyear] = useState(2022)
	const [round, setround] = useState(6)
	const [openForm, setopenForm] = useState(false)
	const [dataSubmit, setdataSubmit] = useState(false)
	const [yearChange, setYearChange] = useState(false);
	const [roundChange, setRoundChange] = useState(false);
	const [openDrawer, setOpenDrawer] = useState(false)
	const [saveTestChoices, setsaveTestChoices] = useState(
		(localStorage.getItem('saveTestChoices') !== null) ?
			JSON.parse(localStorage.getItem('saveTestChoices')) :
			[]
	)

	useEffect(() => {
		setopenForm(true)
	}, [predictionType])
	useEffect(() => {
		setYearChange(true);
	}, [year])
	useEffect(() => {
		setRoundChange(true);
	}, [round])
	useEffect(() => {
		if (dataSubmit || yearChange || roundChange) {
			const payload = {
				instituteType,
				category,
				seatPool,
				quota,
				option,
				year,
				round,
				rank,
				cutoff,
			}
			predictionComponent(payload)
			localStorage.setItem("instituteType", instituteType)
			localStorage.setItem("category", category)
			localStorage.setItem("cutoff", cutoff)
			localStorage.setItem("seatPool", seatPool)
			localStorage.setItem("quota", quota)
			localStorage.setItem("rank", rank)
			localStorage.setItem("option", option)
			localStorage.setItem("year", year)
			localStorage.setItem("round", round)
			setdataSubmit(false)
			setYearChange(false);
			setRoundChange(false)
		}
	}, [dataSubmit, yearChange, roundChange])

	const editDetailButtonClick = () => {
		setopenForm(true)
	}
	const handleAddChoice = (institute_id, branch_id) => {
		let modifiedarray = saveTestChoices;
		let modifiedObject = {
			institute_id: institute_id,
			branch_id: branch_id,
			quota: quota,
			seat_pool: seatPool,
			category: category,
			id: `${institute_id}_${branch_id}_${quota}_${category}_${seatPool}`,
		}
		if (modifiedarray.filter(obj => obj.id === `${institute_id}_${branch_id}_${quota}_${category}_${seatPool}`).length === 0) {
			modifiedarray.push(modifiedObject);
			setsaveTestChoices(modifiedarray);
			localStorage.setItem('saveTestChoices', JSON.stringify(modifiedarray))
		}
		handleOpenDrawer()
	}



	const toolTip = (color) => {
		if (color === "green") {
			return colorCode.green
		} else if (color === "yellow") {
			return colorCode.yellow
		} else if (color === "orange") {
			return colorCode.orange
		} else if (color === "red") {
			return colorCode.red
		}
		return ""
	}

	if (predictionType === "all_one") {
		return (
			<AllBranchOneCollegePrediction
				setpredictionType={setpredictionType}
				predictionType={predictionType}
				toolTip={toolTip}
			/>
		)
	}
	if (predictionType === "one_all") {
		return (
			<OneBranchAllInstitutesPrediction
				setpredictionType={setpredictionType}
				predictionType={predictionType}
				toolTip={toolTip}
			/>
		)
	}
	if (predictionType === "one_one") {
		return (
			<OneBranchOneInstitutesPrediction
				setpredictionType={setpredictionType}
				predictionType={predictionType}
				toolTip={toolTip}
			/>
		)
	}
	const handleOpenDrawer = () => {
		setOpenDrawer(true);
	}


	return (
		<div className='list-container'>
			<Helmet>
				<title>Rank Matrix | All Available Choices</title>
				<meta name="keywords" content="All branches and colleges, All Available Choices,
				 College-wise branch details, Opening and closing ranks for all branches" />
			</Helmet>
			<Header
				heading='Prediction'
				label={
					PredictionList.find(
						(prediction) => prediction.value === predictionType
					).title
				}
			/>
			<div>

			</div>
			<FormDialog
				openForm={openForm}
				setopenForm={setopenForm}
				predictionData={PredictionList.find(
					(prediction) => prediction.value === predictionType
				)}
				predictionList={PredictionList}
				setPredictionType={setpredictionType}
				setInstituteType={setinstituteType}
				setCategory={setcategory}
				setCutoff={setcutoff}
				setSeatPool={setseatPool}
				setQuota={setquota}
				setRank={setrank}
				// setYear={setyear}
				// setRound={setround}
				setOption={setoption}
				setdataSubmit={setdataSubmit}
			/>
			<div className='table-container'>
				<div className='filters between'>
					<Button className='choice-button' onClick={editDetailButtonClick}>
						Edit Details
					</Button>
					<div className="outer-fields">
						<YearField
							form={{ title: "Year", name: "year" }}
							year={year}
							setyear={setyear}
							yearList={yearList}

						/>
						<RoundField
							form={{ title: "Round", name: "round" }}
							round={round}
							setround={setround}
							roundList={roundList}
						/>
					</div>
					<Button variant="filled" className="josaa-list-button" onClick={handleOpenDrawer}>
						JoSAA List
					</Button>
					<TestChoiceDrawer
						open={openDrawer}
						setOpen={setOpenDrawer}
						year={year}
						round={round}
						cutoff={cutoff}
						rank={rank}
						rankMain={rank}
						saveTestChoices={saveTestChoices}
						setsaveTestChoices={setsaveTestChoices}

					/>
				</div>
				{predictionObj.loading ? (
					<CircularProgress />
				) : (
					!predictionObj.error &&
					predictionObj.data.branches &&
					predictionObj.data.branches.length !== 0 &&
					year !== 0 && (
						<>
							<TableContainer
								component={Paper}
								className='prediction-table-container'
							>
								<Table sx={{ minWidth: 650 }}>
									<TableHead className='prediction-table-head'>
										<TableRow>
											<TableCell className='insitute_head' align='center'>
												{instituteType}
											</TableCell>
											{predictionObj.data.institutes.map((institute) => (
												<TableCell key={institute.id} className='insitute_head'>
													{institute.display_code}
												</TableCell>
											))}
										</TableRow>
									</TableHead>
									<TableBody>
										{predictionObj.data.branches.map((branch) => (
											<TableRow key={branch.id} className='prediction'>
												<TableCell className='branch-cell'>
													{branch.branch_code}
												</TableCell>
												{predictionObj.data.institutes.map((institute) => (
													<LightRankTooltip
														title={toolTip(
															predictionObj.data.round_data[
																`${branch.code}-${institute.code}`
															]?.color
														)}
													>
														<TableCell
															align='center'
															className={`${predictionObj.data.round_data[
																`${branch.code}-${institute.code}`
															]?.color
																} rank pointer`}
															onClick={() => {
																if (predictionObj.data.round_data[
																	`${branch.code}-${institute.code}`
																]) {
																	handleAddChoice(institute.id, branch.id);
																}
															}}
														>
															{predictionObj.data.round_data[
																`${branch.code}-${institute.code}`
															]
																? (<>
																	<IconButton className="addIconButton" >
																		<AddIcon className="addIcon white" />
																	</IconButton>
																	{predictionObj.data.round_data[
																		`${branch.code}-${institute.code}`
																	].rank}
																</>)
																: "-"}
														</TableCell>
													</LightRankTooltip>
												))}
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</>
					)
				)}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		predictionObj: makeSelectAllAllPrediction(state),
		yearList: makeSelectYear(state),
		roundList: makeSelectRound(state),
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		predictionComponent: (payload) => dispatch(fetchAllAllPrediction(payload)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AllBranchAllCollegePrediction)
