import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux' 
import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link , useParams } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';

const Profile = ({ profile: {profile, loading}, auth, getProfileById}) => {

    /* to get parametre from url in this case its ID*/
    let {id} = useParams(); 
    
    useEffect(() => {
        getProfileById(id)//we need the id li dakhl f url
    }, [getProfileById, id])
    return ( 
        <Fragment>
            {
            profile === null || loading ?( <Spinner/> ): (
            <Fragment>
                 <section class="container">
            <Link to='/profiles' className="btn btn-light" >Go Back</Link>

            {/* Conditions si c'est propre compte un boutton de modification s'ajoute */}
            { auth.isAuthenticated && 
            auth.loading === false && 
            auth.user._id === profile.user._id  /* or this one = id hit deja khdinah mn url  */&&
            <Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link>
            }
            <div className="profile-grid my-1">
                <ProfileTop profile={profile}/> {/*profile is a parametre  */}
                <ProfileAbout profile={profile}/>
            </div>
            </section>
            </Fragment> 
            )}
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, {getProfileById}) (Profile)
