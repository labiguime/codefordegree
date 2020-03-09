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
<<<<<<< HEAD
        <Route path="/login" exact>
          <Auth />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/dashboard" exact>
          <Dashboard />
        </Route>
=======
        <Route path="/login" component={Auth} exact/>
        <Route path="/signup" component={SignUp} exact />
>>>>>>> lam/front-end-refactor
      </Switch>
    </Router>
    </div>
  );
}

export default App;
