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

export const ImportantPdfs = () => {
	const [searchWord, setSearchWord] = useState("");
	const [page, setPage] = useState(1);

	const onPageChange = (event, value) => {
		setPage(value);
	};

	return (
		<div className='list-container'>
			<Header heading={"Important Pdfs"} />
			<div className='table-container'>
				<div className='filters between'>
					<div>
						{(
							<SearchBar
								labelText={"Search by any keyword"}
								defaultWord={searchWord}
								setSearchKey={setSearchWord}
								setPage={setPage}
							/>
						)}

					</div>
						<>
							<TableContainer component={Paper}>
								<Table sx={{ Width: 650 }}>
									<TableHead>
										<TableRow>
											<TableCell variant="head">
												Sl.NO
											</TableCell>
											<TableCell variant="head">
												Title
											</TableCell>
											<TableCell variant="head" align='right'>
												Download
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{PdfsList.filter((row)=>{
											if(searchWord==""){
												return row
											}
											else if(row.title.toLowerCase().includes(searchWord.toLowerCase())){
												return row
											}
										}).map((row) => (
											<TableRow
												sx={{
													"&:last-child td, &:last-child th": { border: 0 },
												}}
												key={row.id}
											>
												<TableCell>
													{row.id}
												</TableCell>
												<TableCell className='noto-sans' align='left'>
													{row.title}
												</TableCell>
												<TableCell className='noto-sans' align='right'>
													<Link href={row.link} target='_blank' sx={{mr:1}}>
														<DownloadIcon color="primary"/>
													</Link>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
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
		</div>
	);
};

export default ImportantPdfs;