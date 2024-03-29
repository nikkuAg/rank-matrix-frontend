import { CloseOutlined } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { howToUse } from "../../constants/general";
import "./index.scss";

export const HowToUse = ({ openDialog, setOpenDialog }) => {
	const [open, setOpen] = useState(openDialog);

	useEffect(() => {
		setOpen(openDialog);
	}, [openDialog]);

	const handleClose = () => {
		setOpen(false);
		setOpenDialog(false);
	};
	return (
		<div>
			<Dialog
				fullWidth={true}
				maxWidth='lg'
				open={open}
				onClose={handleClose}
				className='how-to-use'
			>
				<DialogTitle>
					<div>How to Use</div>
					<IconButton onClick={handleClose}>
						<CloseOutlined color='black' />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<ul>
						{howToUse.map((item, i) => (
							<li key={i} className='noto-sans'>
								<>
									{item.option && (
										<>
											Select <strong>{item.option}</strong>{" "}
										</>
									)}
									{item.rule}
								</>
								{item.ruleDescription && (
									<ul>
										{item.ruleDescription.map((rule, j) => (
											<li key={j}>
												{!rule.color ? (
													<>
														{rule.option && (
															<>
																Select <strong>{rule.option}</strong>{" "}
															</>
														)}
														{rule.rule}
													</>
												) : (
													<>
														<span
															className='color-code'
															style={{ backgroundColor: rule.code }}
														>
															{rule.color}
														</span>
														{" - "}
														{rule.rule}
													</>
												)}
											</li>
										))}
									</ul>
								)}
							</li>
						))}
					</ul>
				</DialogContent>
			</Dialog>
		</div>
	);
};
