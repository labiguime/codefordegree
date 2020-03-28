import React ,{useState, useEffect, useContext} from 'react';
import axios from 'axios';

export default function Course(props) {

    const [course, setCourse] = useState([]);
    const [problems, setProblems] = useState([]);
    const {CourseId} = props.match.params;

    useEffect(() => {
        const token = localStorage.getItem('token');
        try {
        const fetchCourse = async () => {
            const res = await axios({
                url: 'http://localhost:5000/api/courses/'+CourseId,
                method: "get",
                headers: {
                    "x-auth-token": token
                }
            });
            setCourse(res.data);
          }
          fetchCourse();
        }
        catch (err) {
            console.log(err.message);
        }
    }, []); 


    return (
    <h1> Course Name : {course.name}</h1>
    );
}