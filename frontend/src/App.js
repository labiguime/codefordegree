import React from 'react';
import Auth from './User/pages/Auth'
import SignUp from './User/pages/SignUp'
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
        <Route path="/login" exact>
          <Auth />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
