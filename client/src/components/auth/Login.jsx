import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';//hia "a" href

//we wanna use an action we need to pass it f connect li kayna lteht
import { login } from '../../actions/auth';

//Redux
import { connect } from 'react-redux';//to connect this componnent to redux
import PropTypes from 'prop-types'//pour definir le type des composants


const Login = ({login, isAuthenticated}) => {//destructuring mn props
   

       //state and setstate (react resume)
       const [formData, setFormData] = useState({
              email: '',
              password: ''
       });
       //destructuring
       const {  email, password } = formData;

       const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });//we copy object formData and  [e.target.name] hia [name,email, pass , pass2] cause si chfti f input ktchof name chno fiha and dakshi li endna f value howa li kidkhlo user kndkhloh l' attribut  [e.target.name] o apres kisave f formDatatc'est (settate)

       const  onSubmit = async e => {
              e.preventDefault ();//since it's a submit so he wont submit this prevent (empecher) de faire sa default event which is sumbit
             
              login(email, password);//madrnash bhal login an object bhado {} hit f argument d login f action drnahom aedi
                 
              }
              
        //Redirect if already logged in
       if(isAuthenticated){
       return (<Navigate to="/dashboard" />)
     }
       
       return ( <React.Fragment>
            
                     <h1 className="large text-primary">Sign In</h1>
                     <p className="lead"><i className="fas fa-user"></i> Login To Your Account</p>


                     <form className="form" onSubmit = { e => onSubmit(e)}>

                         

                            <div className="form-group">
                                   <input type="email" placeholder="Email Address" 
                                   name="email"
                                   value= {email}
                                   onChange = { e => onChange(e)} 
                                   required />
                                
                            </div>

                            <div className="form-group">
                                   <input
                                          type="password"
                                          placeholder="Password"
                                          name="password"
                                          value= {password}
                                          onChange = { e => onChange(e)} 
                                          minLength="6" />
                            </div>
                     
                            <input type="submit" className="btn btn-primary" value="Login" />
                     </form>
                     <p className="my-1">
                           Don't have an account yes?<Link to="/register">Sign Up</Link>
                     </p>
              </React.Fragment>);
    
};


Login.propTypes = {
       login : PropTypes.func.isRequired, //ptfr
       isAuthenticated : PropTypes.bool, //ptb

}

const mapStateToProps = state =>({//get states from reducers
       isAuthenticated: state.auth.isAuthenticated//we got the auth state from reducers
     })

export default connect(mapStateToProps, {login})(Login);//so we can used connect de redux ---1-argument : any state we wanna map. 2 argument :allows us to access props.login which is availble within a props/ argmt howa f example hna login well we can put an object with any actions we wanna use
