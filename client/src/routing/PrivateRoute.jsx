import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';







export const PrivateRoute = ( { children , auth : {isAuthenticated , loading}}) => {
console.log(isAuthenticated);
console.log(loading);

  if ( !isAuthenticated && !loading ) {
    return <Navigate to="/login"  />;
  }

  return children;//howa li kbna mn lwl 
};
    


PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
    //isAuthenticated : PropTypes.bool, //ptb

}


const mapStateToProps = state =>({
    auth: state.auth,
    //isAuthenticated: state.auth.isAuthenticated,//we got the auth state from reducers
    //loading: state.auth.loading//we got the auth state from reducers


})

export default connect(mapStateToProps) (PrivateRoute)


