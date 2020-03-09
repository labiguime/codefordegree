import React from 'react';
import Auth from './User/pages/Auth'
import SignUp from './User/pages/SignUp'
import Dashboard from './User/components/Dashboard'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


function App() {
    return (
    <div className="App">
    <Router>
      <Switch>
        <Route path="/login" component={Auth} exact/>
        <Route path="/signup" component={SignUp} exact />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
