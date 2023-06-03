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
import FormDialog from "../../../components/formDialog"
import { Header } from "../../../components/header"
import { TableInfo } from "../../../components/tableHeader"
import { LightRankTooltip, PredictionList } from "../../../constants/general"
import { fetchOneOnePrediction } from "../../../store/actions/prediction"
import { makeSelectOneOnePrediction } from "../../../store/selectors/prediction"
import TestChoiceDrawer from "../TestChoiceDrawer"

const OneBranchOneInstitutesPrediction = ({
	setpredictionType,
	predictionType,
	predictionComponent,
	predictionObj,
	toolTip,
}) => {
	const [instituteType, setinstituteType] = useState("")
	const [category, setcategory] = useState("")
	const [cutoff, setcutoff] = useState(10)
	const [seatPool, setseatPool] = useState("")
	const [quota, setquota] = useState("")
	const [rank, setrank] = useState(0)
	const [branchId, setbranchId] = useState(0)
	const [instituteId, setinstituteId] = useState(0)
	const [openForm, setopenForm] = useState(false)
	const [dataSubmit, setdataSubmit] = useState(false)
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
		if (dataSubmit) {
			const payload = {
				instituteId,
				branchId,
				category,
				seatPool,
				quota,
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
			localStorage.setItem("branchId", branchId)
			localStorage.setItem("instituteId", instituteId)
			setdataSubmit(false)
		}
	}, [dataSubmit])

	const editDetailButtonClick = () => {
		setopenForm(true)
	}
	const handleOpenDrawer = () => {
		setOpenDrawer(true);
	}
	const handleAddChoice = () => {
		let modifiedarray = saveTestChoices;
		modifiedarray.push({
			institute_id: instituteId,
			branch_id: branchId,
			quota: quota,
			seat_pool: seatPool,
			category: category,
			id: `${instituteId}_${branchId}_${quota}_${category}_${seatPool}`,
		})
		setsaveTestChoices(modifiedarray)
		localStorage.setItem('saveTestChoices', JSON.stringify(saveTestChoices))
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
			<FormDialog
				openForm={openForm}
				setopenForm={setopenForm}
				predictionData={PredictionList.find(
					(prediction) => prediction.value === predictionType
				)}
				predictionList={PredictionList}
				setPredictionType={setpredictionType}
				setInstituteType={setinstituteType}
				setBranchId={setbranchId}
				setInstituteId={setinstituteId}
				setCategory={setcategory}
				setCutoff={setcutoff}
				setSeatPool={setseatPool}
				setQuota={setquota}
				setRank={setrank}
				setdataSubmit={setdataSubmit}
			/>
			<div className='table-container'>
				<div className='filters between'>
					<Button className='choice-button' onClick={editDetailButtonClick}>
						Edit Details
					</Button>
					{!predictionObj.error &&
						predictionObj.data.keys &&
						predictionObj.data.keys.length !== 0 && (
							<div className='heading'>
								<TableInfo heading={predictionObj.data.institute.name} />
								<TableInfo heading={predictionObj.data.branch.branch_code} />
								<Button variant="filled" className="josaa-list-button" onClick={handleAddChoice}>Add to Choices</Button>
							</div>
						)}
					<Button variant="filled" className="josaa-list-button" onClick={handleOpenDrawer}>
						JoSAA List
					</Button>
					<TestChoiceDrawer
						open={openDrawer}
						setOpen={setOpenDrawer}
						year={2022}
						round={6}
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
					predictionObj.data.keys &&
					predictionObj.data.keys.length !== 0 && (
						<>
							<TableContainer
								component={Paper}
								className='prediction-table-container'
							>
								<Table sx={{ minWidth: 650 }}>
									<TableHead className='prediction-table-head'>
										<TableRow>
											<TableCell className='insitute_head' />
											{predictionObj.data.keys.map((obj, index) => (
												<TableCell key={index} className='insitute_head'>
													{obj}
												</TableCell>
											))}
										</TableRow>
									</TableHead>
									<TableBody>
										{predictionObj.data.years.map((obj, index) => (
											<TableRow key={index} className='prediction'>
												<TableCell className='branch-cell'>{obj}</TableCell>
												{predictionObj.data.keys.map((key, index) => (
													<LightRankTooltip
														title={toolTip(
															predictionObj.data.round_data[`${obj}-${key}`]
																.color
														)}
													>
														<TableCell
															align='center'
															className={`${predictionObj.data.round_data[`${obj}-${key}`]
																.opening_rank != 0
																? predictionObj.data.round_data[
																	`${obj}-${key}`
																].color
																: ""
																} rank`}
														>
															{predictionObj.data.round_data[`${obj}-${key}`]
																.opening_rank != 0 ? (
																<>
																	{
																		predictionObj.data.round_data[
																			`${obj}-${key}`
																		].opening_rank
																	}
																	<br /> to <br />
																	{
																		predictionObj.data.round_data[
																			`${obj}-${key}`
																		].closing_rank
																	}
																</>
															) : (
																"-"
															)}
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
		predictionObj: makeSelectOneOnePrediction(state),
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		predictionComponent: (payload) => dispatch(fetchOneOnePrediction(payload)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OneBranchOneInstitutesPrediction)
