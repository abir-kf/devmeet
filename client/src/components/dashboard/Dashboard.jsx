import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { useEffect, Fragment } from 'react';
import { getCurrentProfile } from '../../actions/profile';
import { deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Exeprience';
import Education from './Education';



const Dashboard = ({getCurrentProfile, auth :{user}, profile:{loading, profile}, deleteAccount}) => {//destructuring du props and drna aussi destructuring d auth

    //componentDidMount
    useEffect(() =>{
        getCurrentProfile();//we want to get the current profile as soon as the page loads 
    }, [getCurrentProfile]); //so it can load one time mashi dimaaa 

    return  loading && profile === null ? <Spinner/>://condition spinner zeama kitcharga hit baqi maemratsh profile b current profile o howa baqi kitloada
        //sinon ila load= false  and profile = null | load = false and profile 3mer | load = true and profile aemr  (mhm aye haja mn ghir hadik cdt lwl)
        <Fragment >
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i>
                {' Welcome ' + (user && user.name) }
            </p>
            {profile !== null ? (
               <Fragment>

                   <DashboardActions/>
                   <Experience experience={profile.experiences} />
                   <Education education={profile.education} />

                   <button className="btn btn-danger" onClick={() => deleteAccount()}>
                            <i className="fas fa-user-minus"></i>{' '}Delete My Account
                        </button>

               </Fragment>
           ) :  
                //in case maendosh profile
                <Fragment>
                    <p>You have not set up your profile yet, please add some info</p>
                    <Link to='/create-profile' className="btn btn-primary my-1">
                        Create Profile
                    </Link>
                </Fragment>
            }
        </Fragment>
    
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
}


const mapStateToProps = state =>({
    profile: state.profile,
    auth: state.auth,
    
})

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})  (Dashboard);

