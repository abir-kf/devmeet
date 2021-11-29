//Rafc : shortcut 
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types'//pour definir le type des composants


export const NavBar = ({auth: {isAuthenticated, loading}, logout}) => {//props fiha logout et auth li fiha isAuto and loading
 
    const authLinks = (
    <ul>
      <li><Link to="/profiles">Developers</Link></li>
       <li><Link to="/dashboard">
      <i className="fas fa-user" /* to get icon of user*/></i>{' '}
      <span className="hide-sm"/*to hide it when mobile device*/>
      Dashboard
      </span>
      </Link></li>
      <li>
        <a href="#!" onClick={logout}>
        <i className="fas fa-sign-out-alt"></i>{' '}
        <span className="hide-sm"/*so fash tsghar l ecran (mobile) iban ghir logo bla ktba */>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li><Link to="/profiles">Developers</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
)
    return (
        <nav className="navbar bg-dark">
        <h1>
          <Link to="/"><i className="fas fa-code"></i> DevMeet</Link>
        </h1>
        {!loading && /*&& kt3ni hna donc ndiro haka cause hia if o else fih null*/ (<Fragment>{isAuthenticated ? authLinks: guestLinks/*hna drnah 3adi mashi && hit else mafihash null */}</Fragment>)}
      </nav>
    )
}


NavBar.propTypes = {
    logout : PropTypes.func.isRequired, //ptfr

}
const mapStateToProps = state =>({
  auth: state.auth
})



export default connect(mapStateToProps, {logout}) (NavBar);