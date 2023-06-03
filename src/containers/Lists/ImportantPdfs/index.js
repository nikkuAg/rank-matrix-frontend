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
} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import { Header } from "../../../components/header";
import { SearchBar } from "../../../components/search";
import { CustomPagination } from "../../../components/pagination";
import "../../list.scss";
import { PdfsList } from "./constants";
import { Helmet } from "react-helmet";

export const ImportantPdfs = () => {
	const [searchWord, setSearchWord] = useState("");
	const [page, setPage] = useState(1);

	const onPageChange = (event, value) => {
		setPage(value);
	};

	return (
		<div className='list-container'>
			<Helmet>
				<title>Rank Matrix</title>
				<meta name="keywords" content=" Important Resources, Download PDFs, Download Documents" />
			</Helmet>
			<Header heading={"Important Pdfs"} />
			<div className='table-container'>
				{PdfsList.length > 0 &&
					<div className="searchbox">
						{(
							<SearchBar
								labelText={"Search by any keyword"}
								defaultWord={searchWord}
								setSearchKey={setSearchWord}
								setPage={setPage}
							/>
						)}
					</div>}
				<>
					<TableContainer component={Paper}>
						<Table sx={{ Width: 650 }}>
							{PdfsList.length > 0 ?
								(<><TableHead>
									<TableRow>
										<TableCell variant="head" className="header">
											S.NO
										</TableCell>
										<TableCell variant="head" className="header">
											Title
										</TableCell>
										<TableCell variant="head" className="header" align='right'>
											Download
										</TableCell>
									</TableRow>
								</TableHead>
									<TableBody>
										<div>{PdfsList.filter((row) => {
											if (searchWord == "") {
												return row
											}
											else if (row.title.toLowerCase().includes(searchWord.toLowerCase())) {
												return row
											}
										}).map((row) => (
											<TableRow
												sx={{
													"&:last-child td, &:last-child th": { border: 0 },
												}}
												key={row.id}
											>
												<TableCell className='noto-sans'>
													{row.id}
												</TableCell>
												<TableCell className='noto-sans' align='left'>
													{row.title}
												</TableCell>
												<TableCell className='noto-sans' align='right'>
													<Link href={row.link} target='_blank' sx={{ mr: 1 }}>
														<DownloadIcon color="primary" />
													</Link>
												</TableCell>
											</TableRow>
										))}
										</div>
									</TableBody>
								</>)
								:
								<TableRow>
									<TableCell className='emptyList' align='left'>
										No pdf released by JoSAA for the year 2023 yet
									</TableCell>
								</TableRow>}
						</Table>
					</TableContainer>
					{PdfsList.total_pages > 1 && (
						<CustomPagination
							totalPage={PdfsList.total_pages}
							onChange={onPageChange}
							page={page}
						/>
					)}
				</>

			</div>
		</div>
	);
};

export default ImportantPdfs;
