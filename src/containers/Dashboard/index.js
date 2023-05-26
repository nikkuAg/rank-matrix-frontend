import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./index.scss";
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	CircularProgress,
	Grid,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { featuresCard,ImpDates,Dates,Websites } from "./constants";
import { fetchRecentUpdates } from "../../store/actions/dashboard";
import { connect } from "react-redux";
import { makeSelectRecentUpdate } from "../../store/selectors/dashboard";
import Events from "../../components/Calendar/index";


const Dashboard = ({ recentUpdateComponent, recentUpdateObject }) => {
	useEffect(() => {
		recentUpdateComponent();
	}, []);
    

	return (
		<div>
			<Box className='dashboard-container'>
				<Box className='updates'>
					{!recentUpdateObject.loading && !recentUpdateObject.error
						? recentUpdateObject.data.length !== 0 && (
							<div>
								<Typography gutterBottom variant='h5' component='div'>
										Updates
								</Typography>
								<ul className='recent-updates'>
									{recentUpdateObject.data.map((update, index) => (
										<Typography
											gutterBottom
											variant='p'
											key={index}
											component='li'
											className='noto-sans'
										>
											{update.text}
											</Typography>
									))}
								</ul>
							</div>
							)
						: !recentUpdateObject.error && <CircularProgress />}
							<Typography gutterbottom variant='h5' component='div'>
								Important websites
							</Typography>
							<ul>
								{Websites.map((link,index)=>(
									<div>
									<Typography gutterBottom
												variant='p'
												key={index}
												component='li'
												className='noto-sans'
												>
										{link.name}
									</Typography>
									<a href={link.val} >{link.val}</a>
									</div>
								))}
							</ul>
				</Box>
					
				<Grid
					container
					direction='row'
					justifyContent='left'
					spacing={{ xs: 2, md: 3 }}
					columns={{ xs: 4, sm: 8, md: 12 }}
					className="options"
				>
					{featuresCard.map((card, index) => (
						<Grid item xs={2} sm={4} md={4} key={index}>
							<Card>
								<CardActionArea>
									<Link to={card.link}>
										<CardMedia
											component='img'
											alt={card.title}
											image={card.image}
										/>
									</Link>
								</CardActionArea>
								<CardContent>
									<Typography gutterBottom variant='h5' component='div' align="center">
										{card.title}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
				<Grid 
					container
					direction='column'
					spacing={{xs:2, sm:3}}
					columns={{xs:4, sm:8, md:8 }}
					className='datagrid'
				>
					
					<Grid item xs={3} sm={5} md={7} className="datelist">
						<Box className='dates'>
							<ul className="important-dates">
								{ImpDates.map((dates, index) => (
										<Typography
											gutterBottom
											variant='p'
											key={index}
											component='li'
											className='noto-sans'
										>
											{dates.title} : {dates.date}
										</Typography>
								))}
							</ul>
						</Box>
					</Grid>
					<Grid item xs={1} sm={3} md={5}>
						<Box className='dates'>
							<Typography gutterBottom variant='h5' component='div' className="title">
								Important Dates
							</Typography>
							<Events/>
						</Box>
					</Grid>
					
				</Grid>
			</Box>
		</div>
	);
};

Dashboard.propTypes = {
	newUpdateComponent: PropTypes.func,
	recentUpdateComponent: PropTypes.func,
	recentUpdateObject: PropTypes.object,
	howToUseClick: PropTypes.bool,
	setHowToUseClick: PropTypes.func,
};

function mapStateToProps(state) {
	return {
		recentUpdateObject: makeSelectRecentUpdate(state),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		recentUpdateComponent: () => dispatch(fetchRecentUpdates()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
