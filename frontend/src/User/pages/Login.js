import React, {useState, useContext} from 'react';
import SignInForm from '../components/SignInForm';
import { AuthContext } from '../../shared/context/auth-context';
import axios from 'axios';

export default function Login(props){
    const [loginMessage, setLoginMessage] = useState("");
    const auth = useContext(AuthContext);
    let onSubmit = (data) => {
        console.log(data);
        axios.post('http://localhost:5000/api/login', data)
            .then(res => {
                console.log(res);
                auth.login({user: res.data, token: res.headers['x-auth-token']});
            })
            .catch(err => {
                if(err.response){
                    console.log(err.response.data);
                    setLoginMessage(err.response.data);
                }
            })
    }

    return(
        <SignInForm onSubmit={onSubmit} formMessage={loginMessage}/>
    );

}