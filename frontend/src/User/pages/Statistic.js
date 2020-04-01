import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Doughnut} from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import Moment from 'react-moment';
import Dashboard from '../../User/components/Dashboard'

const statisticUrl = (process.env.REACT_APP_BASE_URL || "http://localhost:5000/") + "api/user/statistic";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    textCenter: {
        textAlign: 'center'
    },
    textGreen: {
        color: 'green'
    },
    textFont25: {
        fontSize: 25
    },
    noMarginBottom: {
        marginBottom: 0
    }
    

}));

function createData(timeline, problem, status, language) {
    return {timeline, problem, status, language};
}

const rows = [
  createData(new Date(), "Hello world", "Accepted", "C++"),
  createData(new Date(), "Hello world", "Wrong Answer", "C++"),
];

const labels = ['Accepted', 'Wrong answer', 'Compilation error', 'Runtime error'];
const backgroundColor = [
                '#fc2403',
                '#0bfc03',
                '#fce303',
                '#0345fc',
            ]
export default function Statistic(){
    const classes = useStyles();
    const [chartState, setChartState] = useState({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [
                
            ]
        }],
    });
    const [submissions, setSubmissions] = useState({
        acceptedSub: [],
        wrongAnswerSub: [],
        compileErrorSub: [],
        runtimeErrorSub: []
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(statisticUrl, {
            headers: {
                "x-auth-token": token
            }
        }).then(res => {
            console.log(res);
            let {acceptedSub, wrongAnswerSub, compileErrorSub, runtimeErrorSub}= res.data;
            let newChartState = {...chartState};
            let newSubmissions = {
                acceptedSub: acceptedSub || [],
                wrongAnswerSub: wrongAnswerSub || [],
                compileErrorSub: compileErrorSub || [],
                runtimeErrorSub: runtimeErrorSub || []
            }
            let newChartData = newChartState.datasets[0].data;
            if(newSubmissions.acceptedSub.length != 0){
                newChartData.push(newSubmissions.acceptedSub.length);
                newChartState.labels.push(labels[0]);
                newChartState.datasets[0].backgroundColor.push(backgroundColor[0]);
            }
            if(newSubmissions.wrongAnswerSub.length != 0){
                newChartData.push(newSubmissions.wrongAnswerSub.length);
                newChartState.labels.push(labels[1]);
                newChartState.datasets[0].backgroundColor.push(backgroundColor[1]);
            }
            if(newSubmissions.compileErrorSub.length != 0){
                newChartData.push(newSubmissions.compileErrorSub.length);
                newChartState.labels.push(labels[2]);
                newChartState.datasets[0].backgroundColor.push(backgroundColor[2]);
            }
            if(newSubmissions.runtimeErrorSub.length != 0){
                newChartData.push(newSubmissions.runtimeErrorSub.length);
                newChartState.labels.push(labels[3]);
                newChartState.datasets[0].backgroundColor.push(backgroundColor[3]);
            }
            setSubmissions(newSubmissions);
            setChartState(newChartState);
        }).catch(error => {
            console.log(error);
        });
    }, []);
    let totalSumissions = 0;
    let sortedSub = [];
    for(const subStatus in submissions){
        totalSumissions += submissions[subStatus].length;
        sortedSub = sortedSub.concat(submissions[subStatus]);
    }
    sortedSub.sort((sub1, sub2) => sub2.created_at - sub1.created_at);
    sortedSub.slice(0, 30);
    let tableData = sortedSub.map(e => {
        let statusTextColor = 'red';
        const statusDescription = e.status.description.toLowerCase();
        if(statusDescription == 'accepted')
            statusTextColor = 'green';
        return {
            submitted_time: e.created_at,
            problem: e.problem_id.name,
            status: e.status.description,
            language: e.language.name,
            statusTextColor
        }
    })
    return (<React.Fragment >
            <Dashboard title='Statistic'/>
            <div className={classes.root}>
                <Grid container >
                    <Grid item xs={6}>
                        <Doughnut width={500} 
                           height={300} 
                           data={chartState} 
                           options={{maintainAspectRatio: false}}/>
                    </Grid>
                    <Grid container xs={6}>
                        <Grid xs={12}></Grid>
                        <Grid item xs={4}>
                            <div className={classes.textCenter}>
                                <p className={clsx(classes.textGreen, classes.textFont25, classes.noMarginBottom)}>
                                    {totalSumissions}
                                </p>
                                <p>Total submissions</p>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.textCenter}>
                                <p className={clsx(classes.textGreen, classes.textFont25, classes.noMarginBottom)}>
                                    {submissions.acceptedSub.length}
                                </p>
                                <p>Accepted submissions</p>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.textCenter}>
                                <p className={clsx(classes.textGreen, classes.textFont25, classes.noMarginBottom)}>
                                    {submissions.acceptedSub.length / totalSumissions || 0}
                                </p>
                                <p>Accepted rate</p>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <div>
                <h1>Most recent 30 submissions</h1>
               <TableContainer  >
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Submitted time</TableCell>
                            <TableCell align="left">Problem</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">Language</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {tableData.map((data, index) => (

                            <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                <Moment fromNow>{data.submitted_time}</Moment>
                            </TableCell>
                            <TableCell align="left">{data.problem}</TableCell>
                            <TableCell align="left" style={{color: data.statusTextColor}}>{data.status}</TableCell>
                            <TableCell align="left">{data.language}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer> 
            </div>
        </React.Fragment>
    )
}