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
	IconButton
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import FormDialog from "../../../components/formDialog"
import { Header } from "../../../components/header"
import { TableInfo } from "../../../components/tableHeader"
import { LightRankTooltip, PredictionList } from "../../../constants/general"
import { fetchAllOnePrediction } from "../../../store/actions/prediction"
import { makeSelectAllOnePrediction } from "../../../store/selectors/prediction"
import TestChoiceDrawer from "../TestChoiceDrawer"
import AddIcon from '@mui/icons-material/Add';
import { Helmet } from "react-helmet"

const AllBranchOneCollegePrediction = ({
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
	const handleAddChoice = (branchId) => {
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
		handleOpenDrawer();
	}


	return (
		<div className='list-container'>
			<Helmet>
				<title>Rank Matrix | Specific College</title>
				<meta name="keywords" content="College-specific branch details, Specific College,
				 College-wise branch details, Opening and closing ranks for all branches, College-wise cuttoff trends" />
			</Helmet>
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
						predictionObj.data.branch &&
						predictionObj.data.branch.length !== 0 && (
							<TableInfo heading={predictionObj.data.institutes.name} />
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
					predictionObj.data.branch &&
					predictionObj.data.branch.length !== 0 && (
						<>
							<TableContainer
								component={Paper}
								className='prediction-table-container'
							>
								<Table sx={{ minWidth: 650 }}>
									<TableHead className='prediction-table-head'>
										<TableRow>
											<TableCell className='insitute_head' />
											{predictionObj.data.rounds.map((obj, index) => (
												<TableCell key={index} className='insitute_head'>
													{obj}
												</TableCell>
											))}
										</TableRow>
									</TableHead>
									<TableBody>
										{predictionObj.data.branch.map((branch) => (
											<TableRow key={branch.id} className='prediction'>
												<TableCell className='branch-cell' onClick={() => {
													handleAddChoice(branch.id);
												}}>
													<IconButton className="addIconButton" >
														<AddIcon className="addIcon" />
													</IconButton>
													{branch.branch_code}
												</TableCell>
												{predictionObj.data.round_data[`${branch.code}`].map(
													(obj, index) => (
														<LightRankTooltip title={toolTip(obj.color)}>
															<TableCell
																align='center'
																key={index}
																className={`${obj.opening_rank != 0 ? obj.color : ""
																	} rank`}
															>
																{obj.opening_rank != 0 ? (
																	<>
																		{obj.opening_rank}
																		<br />
																		to
																		<br />
																		{obj.closing_rank}
																	</>
																) : (
																	"-"
																)}
															</TableCell>
														</LightRankTooltip>
													)
												)}
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
		predictionObj: makeSelectAllOnePrediction(state),
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		predictionComponent: (payload) => dispatch(fetchAllOnePrediction(payload)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AllBranchOneCollegePrediction)
