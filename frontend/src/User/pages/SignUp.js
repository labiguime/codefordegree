import React, {useState, useContext} from 'react';
import SignUpForm from '../components/SignUpForm';
import {AuthContext} from '../../shared/context/auth-context';
import axios from 'axios';
import {USER_URL} from '../../shared/constants';

export default function SignUp(){
    const [signUpMessage, setSignUpMessage] = useState("");
    const auth = useContext(AuthContext);
    const onSubmit = (data) => {
       axios.post(USER_URL, data)
            .then(res => {
                console.log(res);
                auth.login({user: res.data, token: res.headers['x-auth-token']});
            }).catch(err => {
                setSignUpMessage(err.response.data.error);
            })
    }
    return(
        <SignUpForm formMessage={signUpMessage} onSubmit={onSubmit}/>
    );

}