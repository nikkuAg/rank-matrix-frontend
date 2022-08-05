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
	TableSortLabel,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import FormDialog from "../../components/formDialog";
import { Header } from "../../components/header";
import {
	AddChoice,
	fileName,
	TestYourChoice,
	toastDuration,
} from "../../constants/general";
import { choicesHeader, download_headers } from "../../constants/tableHeader";
import { fetchTestChoice } from "../../store/actions/prediction";
import { showToast } from "../../store/actions/toast";
import { makeSelectTestChoice } from "../../store/selectors/prediction";
import { CSVLink } from "react-csv";
import "../list.scss";

const TestChoices = ({
	testChoiceObj,
	testChoiceComponent,
	showToastComponent,
}) => {
	const [cutoff, setcutoff] = useState(10);
	const [rank, setrank] = useState(0);
	const [year, setyear] = useState(0);
	const [round, setround] = useState(0);
	const [choice, setchoice] = useState("");
	const [instituteType, setinstituteType] = useState("");
	const [instituteId, setinstituteId] = useState(0);
	const [branchId, setbranchId] = useState(0);
	const [openForm, setopenForm] = useState(false);
	const [dataSubmit, setdataSubmit] = useState(false);
	const [choiceFormOpen, setchoiceFormOpen] = useState(false);
	const [isEditing, setisEditing] = useState(false);
	const [seatPool, setseatPool] = useState("");
	const [quota, setquota] = useState("");
	const [category, setcategory] = useState("");
	const [choiceDataSubmit, setchoiceDataSubmit] = useState(false);
	const [disableAdd, setdisableAdd] = useState(true);
	const [testChoices, settestChoices] = useState([]);
	const [saveTestChoices, setsaveTestChoices] = useState([]);

	useEffect(() => {
		setopenForm(true);
	}, []);

	useEffect(() => {
		if (dataSubmit) {
			settestChoices([]);
			if (choice === localStorage.getItem("choice")) {
				// saveTestChoices.map((obj) => {
				//   const payload = {
				//     instituteId: obj.institute_id,
				//     branchId: obj.branch_id,
				//     quota: obj.quota,
				//     category: obj.category,
				//     seatPool: obj.seat_pool,
				//     rank,
				//     cutoff,
				//     round,
				//     year,
				//   };
				//   testChoiceComponent(payload);
				// });
				saveTestChoices.forEach((element) => {
					const payload = {
						instituteId: element.institute_id,
						branchId: element.branch_id,
						quota: element.quota,
						category: element.category,
						seatPool: element.seat_pool,
						rank,
						cutoff,
						round,
						year,
					};
					testChoiceComponent(payload);
				});
			}
			localStorage.setItem("cutoff", cutoff);
			localStorage.setItem("rank", rank);
			localStorage.setItem("year", year);
			localStorage.setItem("round", round);
			localStorage.setItem("choice", choice);
			setdisableAdd(false);
			setdataSubmit(false);
		}
	}, [dataSubmit]);

	useEffect(() => {
		if (choiceDataSubmit) {
			const payload = {
				instituteId,
				branchId,
				quota,
				category,
				seatPool,
				rank,
				cutoff,
				round,
				year,
			};
			testChoiceComponent(payload);
			localStorage.setItem("instituteType", instituteType);
			localStorage.setItem("instituteId", instituteId);
			localStorage.setItem("branchId", branchId);
			localStorage.setItem("seatPool", seatPool);
			localStorage.setItem("quota", quota);
			localStorage.setItem("category", category);
			setchoiceDataSubmit(false);
			if (isEditing) {
				setisEditing(false);
			}
		}
	}, [choiceDataSubmit]);

	useEffect(() => {
		if (testChoiceObj.data.opening_rank) {
			if (!testChoices.find((obj) => obj.id === testChoiceObj.data.id)) {
				const choice = {
					institute_type: testChoiceObj.data.institute.category,
					institute_name: testChoiceObj.data.institute.name,
					branch_name: testChoiceObj.data.branch.branch_code,
					quota: testChoiceObj.data.quota,
					seat_pool: testChoiceObj.data.seat_pool,
					category: testChoiceObj.data.category,
					opening_rank: testChoiceObj.data.opening_rank || "-",
					closing_rank: testChoiceObj.data.closing_rank || "-",
					color: testChoiceObj.data.color,
					id: testChoiceObj.data.id,
				};
				const saveChoice = {
					institute_id: testChoiceObj.data.institute.id,
					branch_id: testChoiceObj.data.branch.id,
					quota: testChoiceObj.data.quota,
					seat_pool: testChoiceObj.data.seat_pool,
					category: testChoiceObj.data.category,
					id: testChoiceObj.data.id,
				};
				settestChoices((prevChoice) => [...prevChoice, choice]);
				setsaveTestChoices((prevChoice) => [...prevChoice, saveChoice]);
			} else {
				if (!isEditing) {
					showToastComponent(
						"You have already added this choice",
						"error",
						toastDuration
					);
				}
			}
		}
	}, [testChoiceObj]);

	const choiceButtonClick = () => {
		setchoiceFormOpen(true);
	};

	const editDetailButtonClick = () => {
		setisEditing(true);
		setopenForm(true);
	};

	const downloadClick = () => {
		showToastComponent(
			"Your choices have been exported",
			"success",
			toastDuration
		);
	};

	return (
		<div className='list-container'>
			<Header heading='Test your JoSAA Choices' />
			<FormDialog
				openForm={openForm}
				setopenForm={setopenForm}
				predictionData={TestYourChoice}
				setCutoff={setcutoff}
				setRank={setrank}
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
			<div className='table-container'>
				<div className='filters between'>
					<div>
						<Button className='choice-button' onClick={editDetailButtonClick}>
							Edit Details
						</Button>
						<Button
							disabled={disableAdd}
							onClick={choiceButtonClick}
							className='choice-button add-choice'
						>
							Add Your Choice
						</Button>
					</div>
					<CSVLink
						data={testChoices}
						headers={download_headers}
						filename={fileName}
						target='_blank'
						onClick={downloadClick}
					>
						<DownloadIcon color='primary' className='choice-button icon' />
					</CSVLink>
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
											{choicesHeader.map((header, index) => (
												<TableCell key={index}>{header.label}</TableCell>
											))}
										</TableRow>
									</TableHead>
									<TableBody className='prediction'>
										{testChoices.map((row, index) => (
											<TableRow
												sx={{
													"&:last-child td, &:last-child th": { border: 0 },
												}}
												className={`${row.color} rank`}
												key={row.id}
											>
												<TableCell>{index + 1}</TableCell>
												<TableCell>{row.institute_type}</TableCell>
												<TableCell>{row.institute_name}</TableCell>
												<TableCell>{row.branch_name}</TableCell>
												<TableCell>{row.category}</TableCell>
												<TableCell>{row.quota}</TableCell>
												<TableCell>{row.seat_pool}</TableCell>
												<TableCell>{row.opening_rank}</TableCell>
												<TableCell>{row.closing_rank}</TableCell>
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
	);
};

export const mapStateToProps = (state) => {
	return {
		testChoiceObj: makeSelectTestChoice(state),
	};
};

export const mapDispatchToProps = (dispatch) => {
	return {
		testChoiceComponent: (payload) => dispatch(fetchTestChoice(payload)),
		showToastComponent: (message, type, duration) =>
			dispatch(showToast(message, type, duration)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TestChoices);
