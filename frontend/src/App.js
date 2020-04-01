import React, {useState, useEffect} from 'react';
import Login from './User/pages/Login'
import SignUp from './User/pages/SignUp'
import RequireAuthRoute from './shared/components/RequireAuthRoute';
import AllCourses from './Course/pages/AllCourses';
import Statistic from './User/pages/Statistic';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

function App() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/signup" component={SignUp} exact />
            <Route path="/login" component={Login} exact/>
            {/* Now we have to manually insert the dashboard component in every component where we wanna show dashboard*/}
            <RequireAuthRoute exact path="/dashboard" Component={AllCourses}/>
            <RequireAuthRoute exact path="/statistic" Component={Statistic}/>
            {/* <RequireAuthRoute exact path="/profile" Component={Profile}/> //Not done yet*/}
            <Redirect to="/dashboard"/>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
