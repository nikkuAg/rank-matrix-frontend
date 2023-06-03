import React, { useEffect, useState } from "react";
import {
	CircularProgress,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Link,
	TableSortLabel,
	Box,
	IconButton,
	Tooltip,
} from "@mui/material";
import { connect } from "react-redux";
import { Header } from "../../../components/header";
import { CustomPagination } from "../../../components/pagination";
import { fetchInstituteList, setCollegeListFilterValues } from "../../../store/actions/list";
import { makeSelectInstituteType } from "../../../store/selectors/form";
import { makeSelectInstituteList } from "../../../store/selectors/list";
import { SearchBar } from "../../../components/search";
import { visuallyHidden } from "@mui/utils";
import { instituteListHeader } from "../../../constants/tableHeader";
import "../../list.scss";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { fetchInstituteType } from "../../../store/actions/form";
import { ClickableChips } from "../../../components/chips";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FilterBox } from "../../../components/FilterBox";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Helmet } from "react-helmet";

const CollegeList = ({
	instituteListComponent,
	instituteTypeObj,
	instituteTypeComponent,
	instituteListObj,
	instituteFilterComponent,
}) => {

	const filter_anchor_el = instituteListHeader.reduce((accumulator, obj) => {
		accumulator[obj.id] = null;
		return accumulator
	}, {});


	const [institute, setInstitute] = useState("IIT");
	const [page, setPage] = useState(1);
	const [nirfLatestYear, setNirfLatestYear] = useState(2021);
	const [searchWord, setSearchWord] = useState("");
	const [orderBy, setorderBy] = useState("");
	const [order, setorder] = useState("asc");
	const [nirfRankNumber, setnirfRankNumber] = useState(0);
	const [filterAnchorEl, setFilterAnchor] = useState(filter_anchor_el);
	const filterValues = instituteListObj.filterValues;

	useEffect(() => {
		const payload = {
			choice: "both",
		};
		instituteTypeComponent(payload);
	}, []);

	useEffect(() => {
		const payload = {
			page,
			search: searchWord,
			orderField: orderBy,
			ordering: order,
			type_list: institute,
			...filterValues
		};
		instituteListComponent(payload);
	}, [institute, page, searchWord, orderBy, order, filterValues]);

	useEffect(() => {
		if (instituteListObj.data.length > 0) {
			setNirfLatestYear(instituteListObj.data[0].nirf_year);
		}
	}, [instituteListObj]);

	const onPageChange = (event, value) => {
		setPage(value);
	};

	const createSortHandler = (property, toggle = true, ordering = "asc") => (event) => {
		const isAsc = orderBy === property && order === "asc";
		if (toggle) { setorder(isAsc ? "desc" : "asc"); }
		else { setorder(ordering); }

		setorderBy(property);
		setPage(1);
	};

	const previous_nirf = () => {
		setnirfRankNumber(nirfRankNumber - 1);
	};

	const next_nirf = () => {
		setnirfRankNumber(nirfRankNumber + 1);
	};
	const handleFilterOpen = (id, event) => {
		const modified_object = {
			...filterAnchorEl,
			[id]: event.target

		}
		setFilterAnchor(modified_object);
	}
	const handleFilterClose = (id) => {
		const modified_filters = {
			...filterAnchorEl,
			[id]: null

		}
		setFilterAnchor(modified_filters);
	}
	const resetAllFilters = () => {
		instituteFilterComponent({});
		setSearchWord("");
		setorderBy("");
		setorder("asc");
	}

	return (
		<div className='list-container'>
			<Helmet>
				<meta name="keywords" content="Participating colleges, College, Institutes, NIRF, NIRF Ranking, 
					Engineering colleges" />
				<title>Rank Matrix | Participating Colleges</title>
			</Helmet>
			<Header heading={"Participating Colleges"} />
			<div className='table-container'>
				<div className='filters between'>
					{!instituteTypeObj.loading && !instituteTypeObj.error ? (
						<ClickableChips
							chipList={instituteTypeObj.data}
							defaultSelected={"IIT"}
							setChipList={setInstitute}
							setPage={setPage}
							type="list"
						/>
					) : (
						<CircularProgress />
					)}
					{instituteListObj.search && (
						<div className="searchBarContainer">
							<Tooltip title="reset all filters" placement="left">
								<IconButton onClick={resetAllFilters}>
									<RestartAltIcon />
								</IconButton>
							</Tooltip>
							<SearchBar
								labelText={"Search by any keyword"}
								defaultWord={searchWord}
								setSearchKey={setSearchWord}
								setPage={setPage}
							/>
						</div>
					)}
				</div>
				{instituteListObj.loading ? (
					<CircularProgress />
				) : (
					!instituteListObj.error &&
					institute !== "" && (
						<>
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 650 }}>
									<TableHead>
										<TableRow>
											{instituteListHeader.map((header, index) => (
												<TableCell
													sortDirection={
														header.order
															? orderBy === header.id
																? order
																: false
															: false
													}
													key={index}
												>
													<div className="header-cell">
														{header.order ? (
															<TableSortLabel
																active={orderBy === header.id}
																direction={orderBy === header.id ? order : "asc"}
																onClick={createSortHandler(header.id)}
															>

																{orderBy === header.id ? (
																	<Box component='span' sx={visuallyHidden}>
																		{order === "desc"
																			? "sorted descending"
																			: "sorted ascending"}
																	</Box>
																) : null}
																{header.label}
															</TableSortLabel>
														) : (
															header.label
														)}
														<IconButton onClick={(e) => {
															handleFilterOpen(header.id, e)
														}}>
															<MoreVertIcon />
														</IconButton>
													</div>
													<FilterBox
														headerName={header.id}
														anchorEl={filterAnchorEl[header.id]}
														handleClose={handleFilterClose}
														filterName={header.filterName}
														hid={header.id}
														filterValues={filterValues}
														setFilterValues={instituteFilterComponent}
														sortHandler={createSortHandler}
													>

													</FilterBox>
												</TableCell>
											))}
										</TableRow>
									</TableHead>
									{instituteListObj.data.length != 0 && (
										<TableBody>
											{instituteListObj.data.map((row) => (
												<TableRow
													sx={{
														"&:last-child td, &:last-child th": { border: 0 },
													}}
													key={row.id}
												>
													<TableCell className='noto-sans' align='left'>
														{row.code}
													</TableCell>
													<TableCell className='noto-sans' align='left'>
														{row.name}
													</TableCell>
													<TableCell className='noto-sans' align='left'>
														{row.state}
													</TableCell>
													<TableCell
														align='center'
														className='nirf_column noto-sans'
													>
														<div className='nirf_column'>
															<div className='nirf-year-change'>
																{nirfRankNumber > 0 && (
																	<IconButton onClick={previous_nirf}>
																		<ArrowBackIos />
																	</IconButton>
																)}
															</div>
															<div className='nirf_column'>
																<div className='nirf_label'>
																	{nirfRankNumber === 0
																		? row.nirf_1 === 10000
																			? "-"
																			: row.nirf_1 > 250
																				? String(row.nirf_1) +
																				"-" +
																				String(row.nirf_1 + 49)
																				: row.nirf_1
																		: nirfRankNumber === 1
																			? row.nirf_2 === 10000
																				? "-"
																				: row.nirf_2 > 250
																					? String(row.nirf_2) +
																					"-" +
																					String(row.nirf_2 + 49)
																					: row.nirf_2
																			: row.nirf_3 === 10000
																				? "-"
																				: row.nirf_3 > 250
																					? String(row.nirf_3) +
																					"-" +
																					String(row.nirf_3 + 49)
																					: row.nirf_3}
																</div>
																in {nirfLatestYear - nirfRankNumber}
															</div>
															<div className='nirf-year-change'>
																{nirfRankNumber < 2 && (
																	<IconButton onClick={next_nirf}>
																		<ArrowForwardIos />
																	</IconButton>
																)}
															</div>
														</div>
													</TableCell>
													<TableCell className='noto-sans' align='left'>
														<Link href={row.website} target='_blank'>
															{row.website}
														</Link>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									)}
								</Table>
							</TableContainer>
							{instituteListObj.total_pages > 1 && (
								<CustomPagination
									totalPage={instituteListObj.total_pages}
									onChange={onPageChange}
									page={page}
								/>
							)}
						</>
					)
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		instituteTypeObj: makeSelectInstituteType(state),
		instituteListObj: makeSelectInstituteList(state),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		instituteListComponent: (payload) => dispatch(fetchInstituteList(payload)),
		instituteTypeComponent: (payload) => dispatch(fetchInstituteType(payload)),
		instituteFilterComponent: (payload) => dispatch(setCollegeListFilterValues(payload)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CollegeList);
