import React ,{useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Editor from '../../CodeEditor/editor'

export default function Problem(props) {
    console.log(props);
    const {CourseId, ProblemId} = props.match.params;
    
    const [problem, setProblem] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        try {
        const fetchProblem = async () => {
            const res = await axios({
                url: 'http://localhost:5000/api/courses/'+CourseId+'/problems/'+ProblemId,
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
    <div>

        <h1>Problem Name: {problem.name} </h1>
        <p> Description: {problem.description} </p>
        <p> Mark : {problem.mark} </p>
        <p> Runtime : {problem.runtime_limit} ms</p>
        <p> Deadline : {problem.deadline} </p>
        <Editor />

    </div>
    );
}