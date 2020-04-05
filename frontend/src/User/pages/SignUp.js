import React, {useState, useContext} from 'react';
import SignUpForm from '../components/SignUpForm';
import {AuthContext} from '../../shared/context/auth-context';
import axios from 'axios';
import {USER_URL} from '../../shared/constants';

export default function SignUp(props){
    const [signUpMessage, setSignUpMessage] = useState("");
    const {history, location} = props;
    const {from} = location.state || {from: {pathname: '/dashboard'}};
    const onSubmit = (data) => {
       axios.post(USER_URL, data)
            .then(res => {
                // auth.login({user: res.data, token: res.headers['x-auth-token']});
                localStorage.setItem('token', res.headers['x-auth-token']);
                history.push(from);
            }).catch(err => {
                console.log(err);
                setSignUpMessage(err.response.data.error);
            })
    }
    return(
        <SignUpForm formMessage={signUpMessage} onSubmit={onSubmit}/>
    );

}