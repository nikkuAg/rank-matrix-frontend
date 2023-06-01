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
import { CustomPagination } from "../../../components/pagination";
import { SearchBar } from "../../../components/search";
import { visuallyHidden } from "@mui/utils";
import "../../list.scss";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { ClickableChips } from "../../../components/chips";
import { PdfsList } from "./constants";

export const ImportantPdfs = () => {
	return (
		<div className='list-container'>
			<Header heading={"Important Pdfs"} />
			<div className='table-container'>
				<div className='filters between'>
						<>
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 650 }}>
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
										{PdfsList.map((row) => (
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
													<Link href={row.link} target='_blank'>
														<DownloadIcon color="primary"/>
													</Link>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</>
				</div>
			</div>
		</div>
	);
};

export default ImportantPdfs;
