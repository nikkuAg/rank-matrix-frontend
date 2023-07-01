import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { visuallyHidden } from "@mui/utils"
import {
	Box,
	Button,
	CircularProgress,
	Paper,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
	Tabs,
	IconButton,
	Tooltip
} from "@mui/material"
import { Header } from "../../../components/header"
import { SearchBar } from "../../../components/search"
import { fetchSeatMatrix, setSeatMatrixFilterValues } from "../../../store/actions/list"
import { makeSelectInstituteType } from "../../../store/selectors/form"
import { makeSelectSeatMatrix } from "../../../store/selectors/list"
import "../../list.scss"
import { CustomPagination } from "../../../components/pagination"
import { seatMatrixHeader } from "../../../constants/tableHeader"
import { fetchInstituteType } from "../../../store/actions/form"
import { ClickableChips } from "../../../components/chips"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FilterBox } from "../../../components/FilterBox";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Helmet } from "react-helmet"

const SeatMatrix = ({
	seatMatrixComponent,
	seatMatrixFilterComponent,
	instituteTypeObj,
	instituteTypeComponent,
	seatMatrixObj,
}) => {

	const filter_anchor_el = seatMatrixHeader.reduce((accumulator, obj) => {
		accumulator[obj.id] = null;
		return accumulator
	}, {});

	const [instituteType, setInstituteType] = useState("IIT")
	const [page, setPage] = useState(1)
	const [searchWord, setSearchWord] = useState("")
	const [orderBy, setorderBy] = useState("")
	const [order, setorder] = useState("asc")
	const [tabValue, setTabValue] = useState(2022)
	const [seatMatrixYear, setSeatMatrixYear] = useState([])
	const [filterAnchorEl, setFilterAnchor] = useState(filter_anchor_el);
	const filterValues = seatMatrixObj.filterValues;

	useEffect(() => {
		const payload = {
			choice: "both",
		}
		instituteTypeComponent(payload)
	}, [])

	useEffect(() => {
		setPage(1);
	}, [filterValues])


	useEffect(() => {
		let payload = {
			page,
			search: searchWord,
			orderField: orderBy,
			ordering: order,
			type_list: instituteType,
			...filterValues,
		}
		if (tabValue !== "increase") {
			payload["year"] = tabValue
		} else {
			payload["increase"] = true
		}
		seatMatrixComponent(payload)
	}, [instituteType, page, searchWord, orderBy, order, tabValue, filterValues])

	useEffect(() => {
		if (seatMatrixObj.data.length > 0 && seatMatrixYear.length == 0) {
			let data = []
			setTabValue(seatMatrixObj.data[0].latest_year)
			for (let year = 2019; year <= seatMatrixObj.data[0].latest_year; year++) {
				data.push({
					id: year,
					label: `JoSAA ${year}`,
				})
			}
			data.reverse()
			data.push({
				id: "increase",
				label: `Seat change from ${seatMatrixObj.data[0].latest_year - 1}-${seatMatrixObj.data[0].latest_year
					}`,
			})
			setSeatMatrixYear(data)
		}
	}, [seatMatrixObj.data])

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

	const handleChange = (event, newValue) => {
		setTabValue(newValue)
		setPage(1)
	}

	const handleSeatChange = () => {
		setTabValue("increase")
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
		seatMatrixFilterComponent({});
		setSearchWord("");
		setorderBy("");
		setorder("asc");
	}

	return (
		<div className='list-container'>
			<Helmet>
				<title>Rank Matrix | Seat Matrix</title>
				<meta name="keywords" content="Seat matrix, College seat availability, 
				Branch-wise seats, Category-wise seats, Quota allocation, Seat distribution, 
				College-wise seat details, Available seats per branch" />
			</Helmet>
			<Header heading={"Seat Matrix"} />
			<div className='extra-container'>
				<Box
					sx={{ borderBottom: 1, borderColor: "divider" }}
					className='tabs-container'
				>
					<Tabs
						value={tabValue}
						onChange={handleChange}
						className='tabs'
						variant='scrollable'
						scrollButtons='auto'
					>
						{seatMatrixYear.map((year) => (
							<Tab
								label={year.label}
								className={`tab ${year.id === "increase" && "increase-tab"}`}
								key={year.id}
								value={year.id}
							/>
						))}
					</Tabs>
					<Button
						className={`increase-tab-button ${tabValue === "increase" ? "selected" : ""
							}`}
						onClick={handleSeatChange}
					>
						{/* Seat change from {yearObj[1]}-{yearObj[0]} */}
						Seat change from 2021-2022
					</Button>
				</Box>
			</div>
			<div className='table-container'>
				<div className='filters between'>
					{!instituteTypeObj.loading && !instituteTypeObj.error ? (
						<ClickableChips
							chipList={instituteTypeObj.data}
							defaultSelected={"IIT"}
							setChipList={setInstituteType}
							setPage={setPage}
						/>
					) : (
						<CircularProgress />
					)}
					{seatMatrixObj.search && (
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
				{seatMatrixObj.loading ? (
					<CircularProgress />
				) : (
					!seatMatrixObj.error &&
					instituteType !== "" && (
						<>
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 650 }}>
									<TableHead>
										<TableRow>
											{seatMatrixHeader.map((header, index) => (
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
														setFilterValues={seatMatrixFilterComponent}
														sortHandler={createSortHandler}
													>

													</FilterBox>

												</TableCell>
											))}
										</TableRow>
									</TableHead>
									{seatMatrixObj.data.length !== 0 && (
										<TableBody>
											{seatMatrixObj.data.map((row) => (
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
														{row.branch_full_detail.full_name}
													</TableCell>
													<TableCell className='noto-sans'>
														{row.branch_full_detail.duration}
													</TableCell>
													<TableCell className='noto-sans'>
														{row.branch_full_detail.degree}
													</TableCell>
													<TableCell className='noto-sans'>
														{row.seat_pool}
													</TableCell>
													<TableCell className='noto-sans'>
														{row.category}
													</TableCell>
													<TableCell className='noto-sans'>{row.quota}</TableCell>
													<TableCell className='noto-sans'>{row.seats}</TableCell>
												</TableRow>
											))}
										</TableBody>
									)}
								</Table>
							</TableContainer>
							{seatMatrixObj.total_pages > 1 && (
								<CustomPagination
									totalPage={seatMatrixObj.total_pages}
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
		seatMatrixObj: makeSelectSeatMatrix(state),
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		seatMatrixComponent: (payload) => dispatch(fetchSeatMatrix(payload)),
		instituteTypeComponent: (payload) => dispatch(fetchInstituteType(payload)),
		seatMatrixFilterComponent: (payload) => dispatch(setSeatMatrixFilterValues(payload)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SeatMatrix)
