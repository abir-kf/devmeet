//see v:9-4
import React, {useState, Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import { useNavigate } from 'react-router';//to redirect
import {Link} from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { getCurrentProfile } from '../../actions/profile';


const CreateProfile = ({createProfile, setAlert ,profile:{loading, profile}/*, history*/}) => {//props deja fiha props.story so drna destructuring

    //componentDidMount
    useEffect(() =>{
    getCurrentProfile();//we want to get the current profile as soon as the page loads 

    //si kan current suer endo profile f DB aemr nktbohom deja
    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
      bio: loading || !profile.bio ? '' : profile.bio,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      instagram: loading || !profile.social ? '' : profile.social.instagram,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,

  })

    }, [loading]); //so it depends ela loding finma kitloada kn3iyto ela had function
    
      let navigate = useNavigate();
    


    //state and setState
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        bio: '',
        status: '',
        githubusername: '',
        skills: '',
        youtube: '',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: ''
    });

    //destructuring
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = formData;

    //state and setState (state:displaySocialInputs(value) / setState:toggleSocialInputs(methode) / and par defaut displaySocialInputs false)
    const [displaySocialInputs, toggleSocialInputs] = useState(false)

    const onChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value})//we setState the formadata see register.jsx explains it
    }

    const onSubmit =  (e) =>{
        e.preventDefault();
        createProfile(formData /*, history*/);
        navigate('/dashboard');//see react doc (rederict to dashboard)
        
        //si kan deja endo profile donc rah adir update sinn creer profile
        setAlert(profile !== null ? 'Profile Updated' : 'Profile Created', 'success');//profile fih data dialo si kan endo deja profile sinn rah khawi 

      
    } 

    return (
        <Fragment>
             <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={(e)=> onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
            >Give us an idea of where you are at in your career</small>
        </div>
        <div className="form-group">
          <input onChange={(e)=> onChange(e)} value={company} type="text" placeholder="Company" name="company" />
          <small className="form-text"
            >Could be your own company or one you work for</small >
        </div>
        <div className="form-group">
          <input onChange={(e)=> onChange(e)} value={website} type="text" placeholder="Website" name="website" />
          <small className="form-text"
            >Could be your own or a company website</small>
        </div>
        <div className="form-group">
          <input onChange={(e)=> onChange(e)} value={location} type="text" placeholder="Location" name="location" />
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small >
        </div>
        <div className="form-group">
          <input onChange={(e)=> onChange(e)} value={skills} type="text" placeholder="* Skills" name="skills" />
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small >
        </div>
        <div className="form-group">
          <input onChange={(e)=> onChange(e)}
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
          />
          <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username</small>
        </div>
        <div className="form-group">
          <textarea onChange={(e)=> onChange(e)} placeholder="A short bio of yourself" value={bio} name="bio"></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs &&
         <Fragment>
        <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input onChange={(e)=> onChange(e)} type="text" placeholder="Twitter URL" name="twitter" value={twitter} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input onChange={(e)=> onChange(e)} type="text" placeholder="Facebook URL" name="facebook" value={facebook} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input onChange={(e)=> onChange(e)} type="text" placeholder="YouTube URL" name="youtube" value={youtube} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input onChange={(e)=> onChange(e)} type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input onChange={(e)=> onChange(e)} type="text" placeholder="Instagram URL" name="instagram" value={instagram} />
        </div>
            
        </Fragment>}
        <input onClick={(e) => onSubmit(e)} type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
        </Fragment>
    );
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,

};

const mapStateToProps = state =>({
  profile: state.profile,
  auth: state.auth,
  
})




export default connect(mapStateToProps, {setAlert,createProfile,getCurrentProfile}) ((CreateProfile));//if we need to pass the history we need to use withrouter dont forget to import it lfoq
