import React, {useState, useContext} from 'react';
import SignInForm from '../components/SignInForm';
import { AuthContext } from '../../shared/context/auth-context';
import axios from 'axios';
import {LOGIN_URL} from '../../shared/constants';
import {useHistory, useLocation, withRouter} from 'react-router';
export default function Login(props){
    const [loginMessage, setLoginMessage] = useState("");
    const {history, location} = props;
    console.log(location);
    const {from} = location.state || {from: {pathname: "/dashboard"}};
    const auth = useContext(AuthContext);
    let onSubmit = (data) => {
        axios.post(LOGIN_URL, data)
            .then(res => {
                //auth.login({user: res.data, token: res.headers['x-auth-token']});
                localStorage.setItem('token', res.headers['x-auth-token']);
                history.push(from);
            })
            .catch(err => {
                if(err.response){
                    console.log(err.response.data);
                    setLoginMessage(err.response.data.error);
                }
            })
    }

    return(
        <SignInForm onSubmit={onSubmit} formMessage={loginMessage}/>
    );

}