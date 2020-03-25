import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Doughnut} from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
const STATISTIC_API = "http://localhost:5000/api/user/statistic"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    textCenter: {
        textAlign: 'center'
    },

}));
export default function Statistic(){
    const classes = useStyles();
    const [state, setState] = useState({
        labels: ['Accepted', 'Wrong answer', 'Compilation error', 'Runtime error'],
        datasets: [{
            data: [],
            backgroundColor: [
                '#fc2403',
                '#0bfc03',
                '#fce303',
                '#0345fc',
            ]
        }],
    });
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(STATISTIC_API, {
            headers: {
                "x-auth-token": token
            }
        }).then(res => {
            console.log(res);
            let {acceptedSub, wrongAnswerSub, compileErrorSub, runtimeErrorSub}= res.data;
            let newState = {...state};
            let newData = newState.datasets[0].data;
            newData.push(100);
            newData.push(25);
            newData.push(30);
            newData.push(32);
            /*
            newData.push((acceptedSub || []).length);
            newData.push((wrongAnswerSub || []).length);
            newData.push((compileErrorSub || []).length);
            newData.push((runtimeErrorSub || []).length);
            */
            setState(newState);
        }).catch(error => {
            console.log(error);
        });
    }, []);
    return (<React.Fragment >
            <div className={classes.root}>
                <Grid container >
                    <Grid item xs={6}>
                        <Doughnut width={500} 
                           height={300} 
                           data={state} 
                           options={{maintainAspectRatio: false}}/>
                    </Grid>
                    <Grid container xs={6}>
                        <Grid xs={12}></Grid>
                        <Grid item xs={4}>
                            <div className={classes.textCenter}>
                                <p>300</p>
                                <p>Total submissions</p>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.textCenter}>
                                <p>200</p>
                                <p>Accepted submissions</p>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.textCenter}>
                                <p>66.6%</p>
                                <p>Accepted rate</p>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    )
}