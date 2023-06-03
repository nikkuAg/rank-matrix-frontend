import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Header } from "../../../components/header"
import { SearchBar } from "../../../components/search"
import {
	makeSelectInstituteType,
	makeSelectRound,
} from "../../../store/selectors/form"
import { visuallyHidden } from "@mui/utils"
import {
	Box,
	CircularProgress,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
	IconButton,
	Tooltip
} from "@mui/material"
import { rankHeader } from "../../../constants/tableHeader"
import { CustomPagination } from "../../../components/pagination"
import { makeSelectRankList } from "../../../store/selectors/list"
import { fetchRankList, setRankListFilterValues } from "../../../store/actions/list"
import { YearRoundSelect } from "../../../components/selectDialog"
import { fetchInstituteType, fetchRound } from "../../../store/actions/form"
import { ClickableChips } from "../../../components/chips"
import { TableInfo } from "../../../components/tableHeader"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FilterBox } from "../../../components/FilterBox";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Helmet } from "react-helmet"

const Ranks = ({
	instituteTypeObj,
	instituteTypeComponent,
	rankListObj,
	rankFilterComponent,
	rankListComponent,
	roundListComponent,
	roundObj,
}) => {

	const filter_anchor_el = rankHeader.reduce((accumulator, obj) => {
		accumulator[obj.id] = null;
		return accumulator
	}, {});

	const [instituteType, setInstituteType] = useState("IIT")
	const [page, setPage] = useState(1)
	const [searchWord, setSearchWord] = useState("")
	const [orderBy, setorderBy] = useState("")
	const [order, setorder] = useState("asc")
	const [changeYear, setchangeYear] = useState("")
	const [changeRound, setchangeRound] = useState("")
	const [changeData, setchangeData] = useState(false)
	const [year, setyear] = useState(2022)
	const [round, setround] = useState(1)
	const [yearObj, setyearObj] = useState([])
	const [filterAnchorEl, setFilterAnchor] = useState(filter_anchor_el);
	const filterValues = rankListObj.filterValues;
	useEffect(() => {
		const payload = {
			choice: "both",
		}
		instituteTypeComponent(payload)
	}, [])

	useEffect(() => {
		if (rankListObj.data.length > 0) {
			if (yearObj.length == 0) {
				let temp = []
				for (
					let index = rankListObj.data[0].latest_year;
					index >= 2015;
					index--
				) {
					temp.push(index)
				}
				setyearObj(temp)
			}
		}
	}, [rankListObj.data])

	useEffect(() => {
		const payload = {
			type_list: instituteType,
			page,
			search: searchWord,
			orderField: orderBy,
			ordering: order,
			year: year,
			round: round,
			...filterValues,
		}
		rankListComponent(payload)
	}, [instituteType, page, searchWord, orderBy, order, year, filterValues])

	useEffect(() => {
		if (changeData) {
			const payload = {
				typeList: instituteType,
				page,
				search: searchWord,
				orderField: orderBy,
				orderType: order,
				year: changeYear,
				round: changeRound,
			}
			rankListComponent(payload)
			setchangeData(false)
			setchangeYear("")
			setyear(changeYear)
			setround(changeRound)
		}
	}, [changeData])

	useEffect(() => {
		if (changeYear !== "") {
			const payload = {
				year: changeYear,
			}
			roundListComponent(payload)
		}
	}, [changeYear])

	const onPageChange = (event, value) => {
		setPage(value)
	}

	const createSortHandler = (property, toggle = true, ordering = "asc") => (event) => {
		const isAsc = orderBy === property && order === "asc"
		if (toggle) { setorder(isAsc ? "desc" : "asc"); }
		else {
			setorder(ordering)
		}
		setorderBy(property)
		setPage(1)
	}
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
		rankFilterComponent({});
		setSearchWord("");
		setorderBy("");
		setorder("asc");
	}


	return (
		<div className='list-container'>
			<Helmet>
				<title>Rank Matrix | Opening & Closing Ranks</title>
				<meta name="keywords" content="Opening and closing ranks, JoSAA cutoff ranks, 
					College-wise cutoffs, Branch-wise cutoff ranks, Category-wise cutoffs, 
					Minimum cutoff ranks, Maximum cutoff ranks, Last year's cutoff trends" />
			</Helmet>
			<Header heading={"Opening and Closing Rank"} />
			<div className='table-container'>
				<div className='filters between'>
					<div className='chips-and-button'>
						{rankListObj.search && (
							<YearRoundSelect
								buttonText='Change Year and Round'
								formTitle='Select Year and Round'
								firstSelectLabel='Year'
								secondSelectLabel='Round'
								firstSelectList={yearObj}
								firstSelectOnChange={setchangeYear}
								firstSelectValue={changeYear}
								secondSelectList={roundObj}
								secondSelectOnChange={setchangeRound}
								secondSelectValue={changeRound}
								okClick={setchangeData}
								setPage={setPage}
							/>
						)}
						{!instituteTypeObj.loading &&
							!instituteTypeObj.error &&
							(
								<ClickableChips
									chipList={instituteTypeObj.data}
									defaultSelected={"IIT"}
									setChipList={setInstituteType}
									setPage={setPage}
								/>
							)}
					</div>
					{rankListObj.search && (
						<>
							<TableInfo
								heading={`JoSAA ${year} Round ${round}`}
								className='non-mobile'
							/>
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
							<TableInfo
								heading={`JoSAA ${year} Round ${round}`}
								className='mobile'
							/>
						</>
					)}
				</div>
				{rankListObj.loading ? (
					<CircularProgress />
				) : (
					!rankListObj.error &&
					instituteType !== "" && (
						<>
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 650 }}>
									<TableHead>
										<TableRow>
											{rankHeader.map((header, index) => (
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
																{header.label}
																{orderBy === header.id ? (
																	<Box component='span' sx={visuallyHidden}>
																		{order === "desc"
																			? "sorted descending"
																			: "sorted ascending"}
																	</Box>
																) : null}
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
														setFilterValues={rankFilterComponent}
														sortHandler={createSortHandler}
													>

													</FilterBox>

												</TableCell>
											))}
										</TableRow>
									</TableHead>
									{rankListObj.data.length !== 0 && (
										<TableBody>
											{rankListObj.data.map((row) => (
												<TableRow
													sx={{
														"&:last-child td, &:last-child th": { border: 0 },
													}}
													key={row.id}
												>
													<TableCell className='noto-sans'>
														{row.institute_detail.full_name}
													</TableCell>
													<TableCell className='noto-sans'>
														{row.branch_detail.full_name}
													</TableCell>
													<TableCell className='noto-sans'>
														{row.category}
													</TableCell>
													<TableCell className='noto-sans'>{row.quota}</TableCell>
													<TableCell className='noto-sans'>
														{row.seat_pool}
													</TableCell>
													<TableCell className='noto-sans'>
														{row.opening_rank}
													</TableCell>
													<TableCell className='noto-sans'>
														{row.closing_rank}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									)}
								</Table>
							</TableContainer>
							{rankListObj.total_pages > 1 && (
								<CustomPagination
									totalPage={rankListObj.total_pages}
									onChange={onPageChange}
									page={page}
								/>
							)}
						</>
					)
				)}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		instituteTypeObj: makeSelectInstituteType(state),
		rankListObj: makeSelectRankList(state),
		roundObj: makeSelectRound(state),
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		rankListComponent: (payload) => dispatch(fetchRankList(payload)),
		roundListComponent: (payload) => dispatch(fetchRound(payload)),
		instituteTypeComponent: (payload) => dispatch(fetchInstituteType(payload)),
		rankFilterComponent: (payload) => dispatch(setRankListFilterValues(payload)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Ranks)
