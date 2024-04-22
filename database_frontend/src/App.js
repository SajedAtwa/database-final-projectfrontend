import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserDashboard from './components/UserDashboard';
import Populate from './components/Populate'; 
import Drop from './components/Drop'; 
import './App.css';
import RepairService from './components/RepairService';


/*Clean Touch imports */
import CleanTouchHeader from './components/clean_touch/HomePage';
import IndividualCompanyPage from './components/clean_touch/CompanyTemplate';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.min.js'


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
        
        <Route path='/repairservice' component={RepairService}/>

        {/*Clean Touch*/}
        <Route exact path="/clean_touch" component={CleanTouchHeader} />
        <Route path='/clean_touch/company/:companyName' component={IndividualCompanyPage}/>


      </Switch>
    </Router>
  );
}

export default App;
