import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserDashboard from './components/UserDashboard';
import Populate from './components/Populate'; 
import Drop from './components/Drop'; 
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard" component={UserDashboard} />
        <Route path="/populate" component={Populate} /> 
        <Route path="/drop" component={Drop} /> 
      </Switch>
    </Router>
  );
}

export default App;
