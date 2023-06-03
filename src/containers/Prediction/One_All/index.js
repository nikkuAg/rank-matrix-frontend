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
import { fetchOneAllPrediction } from "../../../store/actions/prediction"
import { makeSelectOneAllPrediction } from "../../../store/selectors/prediction"
import { Helmet } from "react-helmet"

const OneBranchAllInstitutesPrediction = ({
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
	const [openForm, setopenForm] = useState(false)
	const [dataSubmit, setdataSubmit] = useState(false)

	useEffect(() => {
		setopenForm(true)
	}, [predictionType])

	useEffect(() => {
		if (dataSubmit) {
			const payload = {
				instituteType,
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
			setdataSubmit(false)
		}
	}, [dataSubmit])

	const editDetailButtonClick = () => {
		setopenForm(true)
	}

	return (
		<div className='list-container'>
			<Helmet>
				<title>Rank Matrix | Specific Branch</title>
				<meta name="keywords" content="Branch-specific college details, Specific Branches,
			 	Branch-wise college details, Opening and closing ranks for all college, Branch-wise cuttoff trends" />
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
				setBranchId={setbranchId}
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
						predictionObj.data.institutes &&
						predictionObj.data.institutes.length !== 0 && (
							<TableInfo heading={predictionObj.data.branch.branch_code} />
						)}
				</div>
				{predictionObj.loading ? (
					<CircularProgress />
				) : (
					!predictionObj.error &&
					predictionObj.data.institutes &&
					predictionObj.data.institutes.length !== 0 && (
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
										{predictionObj.data.institutes.map((institute) => (
											<TableRow key={institute.id} className='prediction'>
												<TableCell className='branch-cell'>
													{institute.name}
												</TableCell>
												{predictionObj.data.round_data[`${institute.code}`].map(
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
																		<br /> to
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
		predictionObj: makeSelectOneAllPrediction(state),
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		predictionComponent: (payload) => dispatch(fetchOneAllPrediction(payload)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OneBranchAllInstitutesPrediction)
