import "./app.scss";
import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar/index";
import { ThemeProvider } from "@mui/material/styles";
import { customtheme } from "../constants/general";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import { useDispatch } from "react-redux";
import CollegeList from "./Lists/CollegesList";
import Toast from "./Toast";
import SeatMatrix from "./Lists/SeatMatrix";
import {
	fetchCategory,
	fetchGender,
	fetchInstituteType,
	fetchYear,
} from "../store/actions/form";
import Ranks from "./Lists/Opening&ClosingRank";
import Prediction from "./Prediction/All_All";
import { NotFound } from "./404";
import TestChoices from "./TestChoice";
import { Footer } from "./Footer";
import {ImportantPdfs} from "../containers/Lists/ImportantPdfs/index"

export const App = () => {
	const [howToUseClick, setHowToUseClick] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		const payload = {
			choice: "both",
		};
		dispatch(fetchYear());
		dispatch(fetchInstituteType(payload));
		dispatch(fetchCategory());
		dispatch(fetchGender());
	}, []);

	return (
		<ThemeProvider theme={customtheme}>
			<Toast />
			<Router>
				<div style={{ position: "relative" }}>
					<Navbar setHowToUseClick={setHowToUseClick} />
					<div className='main-container'>
						<Routes>
							<Route
								path='/'
								element={
									<Dashboard
										howToUseClick={howToUseClick}
										setHowToUseClick={setHowToUseClick}
									/>
								}
							/>
							<Route path='/colleges_list' element={<CollegeList />} />
							<Route path='/seat_matrix' element={<SeatMatrix />} />
							<Route path='/rank' element={<Ranks />} />
							<Route path='/prediction' element={<Prediction />} />
							<Route path='/choices' element={<TestChoices />} />
							<Route path='/pdfs' element={<ImportantPdfs/>} />
							<Route path='*' element={<NotFound />} />
						</Routes>
					</div>
					<Footer />
				</div>
			</Router>
		</ThemeProvider>
	);
};
