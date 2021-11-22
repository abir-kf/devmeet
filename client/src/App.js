import './App.css';
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar  from './components/layout/Navbar.jsx';
import Landing  from './components/layout/Landing.jsx';
import Register from './components/auth/Register.jsx';
import Login from './components/auth/Login.jsx';

const App = () => {
  return (
 <Router>   
    <Fragment>
    <Navbar/>
    <Routes>
    <Route exact path="/" element= { <Landing /> } />
    </Routes>

    <section className="container" >
      <Routes>
        <Route exact path="/Register" element= { <Register /> } />
        <Route exact path="/Login" element= { <Login/> } />

      </Routes>
    </section>
    </Fragment> 
</Router>
  )
};

export default App;
