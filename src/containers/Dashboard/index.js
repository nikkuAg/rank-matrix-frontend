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
import { featuresCard,impDates,websites } from "./constants";
import { fetchRecentUpdates } from "../../store/actions/dashboard";
import { connect } from "react-redux";
import { makeSelectRecentUpdate } from "../../store/selectors/dashboard";
import Events from "../../components/Calendar/index";


const Dashboard = ({ recentUpdateComponent, recentUpdateObject }) => {
	useEffect(() => {
		recentUpdateComponent();
	}, []);

	const [Month,setMonth]=useState();
  const [selectdate,setSelectdate]=useState(null);
  
  function handleMonth(newMonth) {
    setMonth(newMonth);
  }
  function handleSelect(newDate){
    setSelectdate(newDate);
  }
    
	return (
		<div>
			<Box className='dashboard-container'>
        <div className="med-screen">
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
                <div className="website-container">
                  <Typography gutterbottom variant='h5' component='div'>
                    Important websites
                  </Typography>
                  <ul className="important-websites">
                    {websites.map((link,index)=>(
                      <div>
                        <Typography gutterBottom
                          variant='p'
                          key={index}
                          component='li'
                          className='noto-sans'
                        >
                          {link.name}
                        </Typography>
                        <a className="website" href={link.val} >{link.val}</a>
                      </div>
                    ))}
                  </ul>
                </div>
          </Box>
          
          <Grid 
            container
            direction='column'
            columns={{xs:4, sm:8, md:8 }}
            className='dategrid2'
          >
            
            <Grid item xs={3} sm={5} md={7} className="datelist">
              <Box className='dates'>
                <Typography gutterBottom variant='h5' component='div' className="title">
                  Important Dates
                </Typography>
                <div className="important-dates">
                  {impDates.map((dates, index) =>{ 
                    let start=dates.startDate;
                    let startobj=new Date(start)
                    if(startobj.getMonth()+1===Month){
                      return (
                        <div className="timeline">
                          <div className="timeline-date">
                              {startobj.getDate()}
                          </div>
                          <Typography
                            gutterBottom
                            variant='p'
                            component='p'
                            key={index}
                            className='noto-sans'
                          >
                            {dates.title} 
                          </Typography>
                        </div>
                      )
                    }	
                  })}
                </div>
              </Box>
            </Grid>
            <Grid item xs={1} sm={3} md={5}>
              <Box className='dates'>
                <Events change={handleMonth} dateChange={handleSelect}/>
              </Box>
            </Grid>
          </Grid>
				</div>
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
					columns={{xs:4, sm:8, md:8 }}
					className='dategrid'
				>
					
					<Grid item xs={2} sm={5} md={7} className="datelist">
						<Box className='dates'>
              <Typography gutterBottom variant='h5' component='div' className="title">
								Important Dates
							</Typography>
							<div className="important-dates">
								{impDates.map((dates, index) =>{ 
                  let start=dates.startDate;
                  let startobj=new Date(start)
                  if(startobj.getMonth()+1===Month){
                    return (
                      <div className="timeline">
                        <div className="timeline-date">
                            {startobj.getDate()}
                        </div>
                        <Typography
                          gutterBottom
                          variant='p'
                          component='p'
                          key={index}
                          className='noto-sans'
                        >
                          {dates.title} 
                        </Typography>
                      </div>
                    )
                  }	
                })}
							</div>
						</Box>
					</Grid>
					<Grid item xs={1} sm={3} md={5}>
						<Box className='dates'>
							<Events change={handleMonth} dateChange={handleSelect}/>
						</Box>
					</Grid>
				</Grid>
        <div className="website-container2">
          <Typography gutterbottom variant='h5' component='div' className="title">
            Important websites
          </Typography>
          <ul className="important-websites">
            {websites.map((link,index)=>(
              <div>
                <Typography gutterBottom
                  variant='p'
                  key={index}
                  component='li'
                  className='noto-sans'
                >
                  {link.name}
                </Typography>
                <a className="website" href={link.val} >{link.val}</a>
              </div>
            ))}
          </ul>
        </div>
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
