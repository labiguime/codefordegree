import React ,{useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Editor from '../../CodeEditor/editor'
import SplitPane, {Pane}from 'react-split-pane';
import Moment from 'react-moment';
import {COURSE_URL} from '../../shared/constants';
import './problem.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

function ProblemDescription(props){
    let {problem} = props;
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
  
    return (
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Problem: 
          </Typography>
          <Typography variant="h5" component="h2">
            {problem.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Deadline : <Moment format="HH:mm on MMM D, YYYY ">{problem.deadline}</Moment>
          </Typography>
          <Typography variant="body2" component="p">
            Description: {problem.description}
            <br /><br />
            Mark : {problem.mark}
            <br />
            Runtime : {problem.runtime_limit} ms
          </Typography>
        </CardContent>
      </Card>
    );
  }


export default function Problem(props) {
    const {CourseId, ProblemId} = props.match.params;
    
    const [problem, setProblem] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        try {
            const fetchProblem = async () => {
                const res = await axios({
                    url: `${COURSE_URL}/${CourseId}/problems/${ProblemId}`,
                    method: "get",
                    headers: {
                        "x-auth-token": token
                    }
                });
                setProblem(res.data);
            }
            fetchProblem();
        }
        catch (err) {
            console.log(err.message);
        }
    }, []);
    return (
        <SplitPane 
            split="vertical"
            minSize={400}
            initialSize={400}
            maxSize={600}
            style={{overflow: 'auto'}}
        >
            <Pane>
                <ProblemDescription problem={problem}/>
            </Pane>
            <Editor submitDeadline={problem.deadline} courseId={CourseId} problemId={ProblemId}/>
        </SplitPane>
        
    );
}