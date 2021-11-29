import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';//to redirect


function AddExperience({addExperience}) {

    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false,//false par defaut hit kayna to li lfoq but in case makantsh andiro current mean rah baqi khedam fiha
        description: ''
    })

    //set state todateDisabled to false (hia bash ila kan current checkbox is checked so to khasha tkon disabled = (toDateDisabled=true) but hna l3ks so atkon false hit kant not checked)
    const [toDateDisabled, toggleDisabled] = useState(false);

    //Destructuring
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = formData;

    //setState mn inputs li kndkhlo
    const onChange = e => setFormData({...formData, [e.target.name] : e.target.value})

    const onSubmit =  (e) =>{
        e.preventDefault();
        addExperience(formData);
        navigate('/dashboard');//see react doc (rederict to dashboard)
              
    } 


    return (
        <Fragment>
              <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input value={title} onChange={e => onChange(e)} type="text" placeholder="* Job Title" name="title" required />
        </div>
        <div className="form-group">
          <input value={company} onChange={e => onChange(e)} type="text" placeholder="* Company" name="company" required />
        </div>
        <div className="form-group">
          <input value={location} onChange={e => onChange(e)} type="text" placeholder="Location" name="location" />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input value={from} onChange={e => onChange(e)} type="date" name="from" />
        </div>
         <div className="form-group">
          <p><input value={current} checked={current}  type="checkbox" name="current" onChange={e => {
              setFormData({...formData, current: !current});/* setState current wlat l3aks cause wrkna eliha */ 
              toggleDisabled(!toDateDisabled)/* hadi dial toDate khasha tkon l3ks dial cas li kant fih qbl puisque current matalan checked iwa "to" khasha manbqawsh nwrko eliha dakshi bash disabled atwli true */ 
          }} /> {' '}Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input value={to} onChange={e => onChange(e)} type="date" name="to" disabled={toDateDisabled ? 'disabled': '' } />
        </div>
        <div className="form-group">
          <textarea
            value={description} onChange={e => onChange(e)} 
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form> 
        </Fragment>
    )
}


AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
}

export default connect(null, {addExperience}) (AddExperience)

