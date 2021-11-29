import './App.css';
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar  from './components/layout/Navbar.jsx';
import Landing  from './components/layout/Landing.jsx';
import Register from './components/auth/Register.jsx';
import Login from './components/auth/Login.jsx';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-froms/CreateProfile';
import AddEducation from './components/profile-froms/AddEducation';
import AddExperience from './components/profile-froms/AddExperience';
//Profile forlder 
import Profile from './components/profile/Profile';

import Profiles from './components/profiles/Profiles';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './routing/PrivateRoute';


//Redux
import {Provider} from 'react-redux';
import store from './store';//we created
import { loadUser } from './actions/auth';


 //go check utils
 if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {

 
  
    //Component did mount (see react doc)/v:8/2   
    useEffect(() =>{
      store.dispatch(loadUser());//drna useEffect bash nqdro n3iyto ela loadUser mn actions(redux) l hna 
    }, [])//cause 7na bghinaha tloada mra whda mashi kola that s why zdna []
  
  return (
 <Provider store={store}>
   <Router>   
    <Fragment>
    <Navbar/>
    <Routes>
    <Route exact path="/" element= { <Landing /> } />
    </Routes>
    <section className="container" >
    <Alert/>
      <Routes>
        <Route exact path="/Register" element= { <Register /> } />
        <Route exact path="/Login" element= { <Login/> } />
        <Route exact path="/Profiles" element= { <Profiles/> } />
        <Route exact path="/Profile/:id" element= { <Profile/> } />
        <Route path="/Dashboard" element={ <PrivateRoute> <Dashboard /> </PrivateRoute>} />
        <Route path="/create-profile" element={ <PrivateRoute> <CreateProfile /> </PrivateRoute>} />
        <Route path="/add-experience" element={ <PrivateRoute> <AddExperience /> </PrivateRoute>} />
        <Route path="/add-education" element={ <PrivateRoute> <AddEducation /> </PrivateRoute>} />

        {/* <PrivateRoute exact path="/Dashboard" element= { <Dashboard/> } />
         */}

      </Routes>
    </section>
    </Fragment> 
</Router>
 </Provider>
  )
};

export default App;
