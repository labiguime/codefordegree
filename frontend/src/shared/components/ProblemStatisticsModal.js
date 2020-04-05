import React from 'react';
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
  searchFieldAppearance: {
      minWidth: "40%",
	  textAlign: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    float: "left",
}, textGreen: {
	  color: 'green',
	  align: 'right'
  },
  cardStyle: {
    width: '95%',
},
legendRoot: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  }
}));

export default function ProblemStatisticsModal(props) {
	const classes = useStyles();
	const data = [
	  { country: 'Passed', area: 1 },
	  { country: 'Failed', area: 3 },
	];

	const graphData = [{
	  country: 'USA',
	  gold: 113,
	  silver: 18,
	  bronze: 36,
	}];
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
				  data={data}
				>
				  <PieSeries
					valueField="area"
					argumentField="country"
					labelField="country"
				  >
				  </PieSeries>
				  <Legend
		          position='left' />
				  <Animation />
				</Chart>

				</Grid>


				<Grid item xs={6}>
				<Grid container align="center"
	  				justify="center" direction="column">
				<Typography>
				Class average:
				</Typography>
				<Typography className={classes.textGreen}>
					50%
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
            valueField="gold"
            argumentField="country"
            color="#c0c0c0"
          />
          <BarSeries
            name="Successes"
            valueField="silver"
            argumentField="country"
            color="#ffd700"
          />
          <Animation />
          <Legend position="left" className={classes.legendRoot}/>
          <Stack />
        </Chart>
		</Grid>
		<Grid item xs={6}>
		<Grid container alignItems="center"
			justify="center" direction="column" spacing={2}>
			<Grid item xs={6}>
			<Typography className={classes.textGreen} align="center">
				50%
			</Typography>
				<Typography variant="h7">
				Attempts per student
				</Typography>

			</Grid>
			<Grid item xs={6}>
				<Typography className={classes.textGreen} align="center">
					50%
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
							<Typography className={classes.textGreen}  align='center'>
								5
							</Typography>
							<Typography align='center'>
							student(s) have made at least one submission
							</Typography>

						</Grid>
						<Grid item xs={4}>
							<br />
							<br />
							<Typography className={classes.textGreen}  align='center'>
								7
							</Typography>
							<Typography align='center'>
							student(s) have completed this problem
							</Typography>
						</Grid>
						<Grid item xs={4}>
							<br />
							<br />
							<Typography className={classes.textGreen}  align='center'>
								13
							</Typography>
							<Typography align='center'>
							completion attemps have been made
							</Typography>
						</Grid>
					</Grid>
		</div>
	);
}
