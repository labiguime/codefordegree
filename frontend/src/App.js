import React, {useState, useEffect} from 'react';
import Login from './User/pages/Login'
import SignUp from './User/pages/SignUp'
import Dashboard from './User/components/Dashboard'
import Problem from './Problem/pages/Problem'
import Editor from './CodeEditor/editor';
import {AuthContext} from './shared/context/auth-context';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const login = (data) => {
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true);
      setUserInfo(data.user);
    }
    const logout = () => {
      localStorage.setItem('token', '');
      setIsLoggedIn(false);
      setUserInfo({});
    }
    useEffect(() => {
      const token = localStorage.getItem('token');
      if(token){
        axios({
          url: 'http://localhost:5000/api/user/me',
          headers: {
            'x-auth-token': token 
          }
        }).then(res => {
                login({token, user: res.data});
              }).catch(error => {
                console.log(error);
              }) 
      } 
    }, []);
    let routes;
    if(isLoggedIn){
      routes = (
        <Switch>
          <Route path="/problem/:CourseId/:ProblemId" render={(props) => <Problem {...props}/>} exact/>
          <Route path="/dashboard" render={(props) => <Dashboard {...props} userInfo={userInfo}/>} exact/>
          <Route path="/editor" exact >
              <Editor /> 
          </Route>
          <Redirect push to="/dashboard" />
        </Switch>
      )
    }else{
      routes = (
        <Switch>
          <Route path="/login" component={Login} exact/>
          <Route path="/signup" component={SignUp} exact/>
          <Redirect to="/login" />
        </Switch>
      )
    }
    return (
    <AuthContext.Provider value={{isLoggedIn, login, logout, userInfo}}>
      <div className="App">
        <Router>
          {routes}
        </Router>
      </div>
    </AuthContext.Provider>

  );
}

export default App;
