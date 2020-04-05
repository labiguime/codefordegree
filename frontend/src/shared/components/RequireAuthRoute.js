import React, {useState, useContext, useEffect} from 'react';
import {Redirect, Route, useHistory} from 'react-router';
import {USER_URL} from '../constants';
import axios from 'axios';
import { AuthContext } from '../context/auth-context';

export default function RequiredAuthRoute({Component, ...rest}){

      const [isLoading, setLoading] = useState(true);
      const [authInfo, setAuthInfo] = useState({isLoggedIn: false, userInfo: {}});
      useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
          axios({
            url: USER_URL + "/me",
            headers: {
              'x-auth-token': token 
            } 
          }).then(res => {
                  console.log(res);
                  setAuthInfo({token, userInfo: res.data, isLoggedIn: true});
                  setLoading(false);
                }).catch(error => {
                  console.log(error);
                  setLoading(false);
                  setAuthInfo({token: '', userInfo: {}, isLoading: false});
                }) 
        }else{
          setLoading(false);
        }
      }, []);
      
      if(isLoading) {
          return null;
      }
      return (
        <Route 
          {...rest}
          render={ ({location, history, ...rest}) => {
                    const logout = () => {
                      localStorage.setItem('token', '');
                      history.push("/login");
                    }

                    return authInfo.isLoggedIn ? <AuthContext.Provider value={{isLoggedIn: authInfo.isLoggedIn, userInfo: authInfo.userInfo, logout}}>
                                            <Component {...rest}/>
                                          </AuthContext.Provider>
                                        : <Redirect to={{pathname: "/login", state: {from: location}}}/>
          }}
        />
      )
}


