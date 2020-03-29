import React, {useState, useEffect} from 'react';
import Login from './User/pages/Login'
import SignUp from './User/pages/SignUp'
import Dashboard from './User/components/Dashboard'
import RequireAuthRoute from './shared/components/RequireAuthRoute';
import {AuthContext} from './shared/context/auth-context';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {USER_URL} from './shared/constants';

function App() {
    let routes = (
      <Switch>
        <Route path="/signup" component={SignUp} exact />
        <Route path="/login" component={Login} exact/>
        <RequireAuthRoute path="/dashboard" Component={Dashboard} />
        <Redirect to="/login"/>
      </Switch>
    )
    return (
      <div className="App">
        <Router>
          {routes}
        </Router>
      </div>
  );
}

export default App;
