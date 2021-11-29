import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { getProfiles } from '../../actions/profile'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = ({getProfiles, profile: {profiles, loading}}) => {
    useEffect(() => {
        getProfiles();
    }, [ getProfiles]);
    
    return (
        <Fragment>
            {
            loading ? <Spinner/> : 
            <Fragment>
                <h1 class="large text-primary">Developers</h1>
                <p class="lead">
                    <i class="fab fa-connectdevelop"></i> Browse and connect with developers
                </p>
                <div class="profiles">
                    {profiles.length === 0 ? <h4>No Profiles Found</h4> : (
                        profiles.map(profile => (//ghadi n3iyto ela profileItem li kt affichi lina profile ghir khasna nsifto liha id dialo o data (ghir design dial affichage) 
                            <ProfileItem key={profile._id} profile={profile}/>
                        ))
                    )}
                </div>
            </Fragment>
            }
        </Fragment>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfiles}) (Profiles)
