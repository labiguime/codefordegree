import React from 'react';
import './App.css';
//import NavBar from './Components/Common/navBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Student/Pages/Login';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

function App() {
  return (
  <Router>
    <Switch>
      <Route path="/login" exact>
        <Login />
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
