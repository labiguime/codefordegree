import React, {useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {COURSE_URL} from '../../shared/constants';
import axios from 'axios';

import {
  Chart,
  PieSeries,
  Title,
  Legend,
  ArgumentAxis,
  ValueAxis,
  BarSeries
} from '@devexpress/dx-react-chart-material-ui';

import { Stack, Animation } from '@devexpress/dx-react-chart';

const useStyles = makeStyles(theme => ({
	typographyStyle: {
  		color: 'green',
	  	align: 'center'
  	},
  	cardStyle: {
    	width: '95%',
	}
}));

export default function ProblemStatisticsModal(props) {

	const classes = useStyles();
	const defaultValueMap = props.defaultValueMap || {};
    const [problemInfo, setProblemInfo] = React.useState({...defaultValueMap});
	const [totalSubmissions, setTotalSubmissions] = React.useState(0);
	const [totalStudents, setTotalStudents] = React.useState(0);
	const [totalPassed, setTotalPassed] = React.useState(0);

	useEffect(() => {
        const token = localStorage.getItem('token');
        try {
            const getTotalStudents = async () => {
				try {
					const res = await axios({
	                    url: COURSE_URL+"/"+problemInfo.course_id+"/problems/"+problemInfo._id+"/submissions?latest=true",
	                    method: "get",
	                    headers: {
	                        "x-auth-token": token
	                    }
	                });
					const data = res.data;
					const total = data.length;
					setTotalStudents(total);
					console.log(total);
				} catch (err) {
		            console.log(err.message);
		        }
            }

			const getTotalSubmissions = async () => {
				try {
					const res = await axios({
	                    url: COURSE_URL+"/"+problemInfo.course_id+"/problems/"+problemInfo._id+"/submissions",
	                    method: "get",
	                    headers: {
	                        "x-auth-token": token
	                    }
	                });
					const total = res.data.length;
					setTotalSubmissions(total);
				} catch (err) {
		            console.log(err.message);
		        }
            }

			const getNumberOfPassed = async () => {
				try {
					const res = await axios({
	                    url: COURSE_URL+"/"+problemInfo.course_id+"/problems/"+problemInfo._id+"/submissions?passed=true",
	                    method: "get",
	                    headers: {
	                        "x-auth-token": token
	                    }
	                });
					const total = res.data.length;
					setTotalPassed(total);
				} catch (err) {
		            console.log(err.message);
		        }
            }
            getTotalStudents();
			getTotalSubmissions();
			getNumberOfPassed();
        }
        catch (err) {
            console.log(err.message);
        }
    }, []);
	const fValue = (totalStudents-totalPassed);
	const pieChartData = [{entry: 'Passed', value: totalPassed}, {entry: 'Failed', value: fValue}];
	const graphData = [{state: 'Test', attempted: totalSubmissions, passed: totalPassed}];
	return (
		<div>
		<Grid container alignItems="center" justify="center" direction="row">
			<Grid item xs={6} >
				<Card className={classes.cardStyle}>
			  		<CardContent>
				  		<Grid container alignItems="center" justify="center" direction="row">
					  		<Grid item xs={6}>
								<Chart
								  width={275}
								  height={275}
								  data={pieChartData}
							  	>
				  					<PieSeries
										valueField="value"
										argumentField="entry"
										labelField="entry"
				  					/>
									<Legend
									position='left' />
									<Animation />
								</Chart>
							</Grid>
							<Grid item xs={6}>
								<Grid container align="center" justify="center" direction="column">
									<Typography>
										Class average:
									</Typography>
									<Typography className={classes.typographyStyle}>
										{(totalStudents == 0) ? 0 : (totalPassed/totalStudents)*100}%
									</Typography>
								</Grid>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={6}>
				<Card className={classes.cardStyle}>
					<CardContent>
						<Grid container alignItems="center" justify="center" direction="row">
							<Grid item xs={6}>
								<Chart
						          data={graphData}
								  width={275}
								  height={275}
					        	>
					          		<ArgumentAxis />
					          		<ValueAxis />

									<BarSeries
									name="Attempts"
									valueField="attempted"
									argumentField="state"
									color="#c0c0c0"
									/>
									<BarSeries
									name="Successes"
									valueField="passed"
									argumentField="state"
									color="#ffd700"
									/>
					          		<Animation />
					          		<Legend position="left"/>
					          		<Stack />
					        	</Chart>
							</Grid>
							<Grid item xs={6}>
								<Grid container alignItems="center" justify="center" direction="column" spacing={2}>
									<Grid item xs={6}>
										<Typography className={classes.typographyStyle} align="center">
											{(totalStudents == 0) ? 0 : (totalSubmissions/totalStudents)}
										</Typography>
										<Typography variant="h7">
											Attempts per student
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography className={classes.typographyStyle} align="center">
											{(totalSubmissions == 0) ? 0 : (totalPassed/totalSubmissions)*100}%
										</Typography>
										<Typography variant="h7">
										Success rate
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
		<Grid container alignItems="center" justify="center">
			<Grid item xs={4}>
				<br />
				<br />
				<Typography className={classes.typographyStyle}  align='center'>
					{totalStudents}
				</Typography>
				<Typography align='center'>
				student(s) have made at least one submission
				</Typography>

			</Grid>
			<Grid item xs={4}>
				<br />
				<br />
				<Typography className={classes.typographyStyle}  align='center'>
					{totalPassed}
				</Typography>
				<Typography align='center'>
				student(s) have completed this problem
				</Typography>
			</Grid>
			<Grid item xs={4}>
				<br />
				<br />
				<Typography className={classes.typographyStyle}  align='center'>
					{totalSubmissions}
				</Typography>
				<Typography align='center'>
				completion attemps have been made
				</Typography>
			</Grid>
		</Grid>
		</div>);
}
