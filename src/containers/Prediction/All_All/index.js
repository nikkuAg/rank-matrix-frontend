import {
	Button,
	CircularProgress,
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

const AllBranchAllCollegePrediction = ({
	predictionObj,
	predictionComponent,
}) => {
	const [predictionType, setpredictionType] = useState("all_all")
	const [instituteType, setinstituteType] = useState("")
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

	useEffect(() => {
		setopenForm(true)
	}, [predictionType])

	useEffect(() => {
		if (dataSubmit) {
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
		}
	}, [dataSubmit, year, round, cutoff])

	const editDetailButtonClick = () => {
		setopenForm(true)
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

	return (
		<div className='list-container'>
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
					<div>
						{/* <YearFieldint 
							year={year}
							setYear={setyear}

						/>
						<RoundField
							roud={round}
							setRound={setround}
						/>
						<RankField
							rank={rank}
							rankMain={rank}
							setCutoff={setcutoff}
						/> */}
						<Button variant="filled">
							JoSAA List
						</Button>

					</div>
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
																} rank`}
														>
															{predictionObj.data.round_data[
																`${branch.code}-${institute.code}`
															]
																? predictionObj.data.round_data[
																	`${branch.code}-${institute.code}`
																].rank
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
