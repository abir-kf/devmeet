
//Rafc : shortcut 
import React from 'react';
import { connect } from 'react-redux';
import {Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'//pour definir le type des composants




export const Landing = ({isAuthenticated}) => {

  if(isAuthenticated){
    return <Navigate to="/dashboard"  />;
  }

    return (
        <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developers Meeting</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
    )
}


Landing.propTypes = {
  isAuthenticated: PropTypes.bool, //ptfr

}
const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated//we got the auth state from reducers

})



export default connect(mapStateToProps)(Landing);

