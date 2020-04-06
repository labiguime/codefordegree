import React ,{useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Editor from '../../CodeEditor/editor'
import SplitPane, {Pane}from 'react-split-pane';
import Moment from 'react-moment';
import {COURSE_URL} from '../../shared/constants';
import {AuthContext} from '../../shared/context/auth-context';
import './problem.css';

function ProblemDescription(props){
    let {problem} = props;
    return <React.Fragment>
        <h1>Problem: {problem.name} </h1>
        <p> Description: {problem.description} </p>
        <p> Mark : {problem.mark} </p>
        <p> Runtime : {problem.runtime_limit} ms</p>
        <p> Deadline : <Moment format="HH:mm on MMM D, YYYY ">{problem.deadline}</Moment></p>
    </React.Fragment>
}

export default function Problem(props) {
    const {CourseId, ProblemId} = props.match.params;
    
    const [problem, setProblem] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const auth = useContext(AuthContext);

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
                const problem = res.data;
                if(problem && problem.course_id && problem.course_id.admin_id == auth.userInfo._id)
                    setIsAdmin(true);
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
            <Editor isAdmin={isAdmin} submitDeadline={problem.deadline} courseId={CourseId} problemId={ProblemId}/>
        </SplitPane>
        
    );
}