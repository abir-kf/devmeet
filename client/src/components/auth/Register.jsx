import React, { useState } from 'react';
import { Link, Navigate} from 'react-router-dom';//in the version5 redirect(vs:5) = navigate (version6)
import { connect } from 'react-redux'//to connect this componnent to redux
import PropTypes from 'prop-types'//pour definir le type des composants


//we wanna use an action we need to pass it f connect li kayna lteht
import { setAlert } from '../../actions/alert';//we call it it s a props hit "state" mn blasa khera mashi state hit state kikon local
import { register } from '../../actions/auth';
//import axios from 'axios';

 
const Register = ({setAlert, register, isAuthenticated}) => {//hna kndkhlo object props li fih setAlert but andiro destructuring so nktbo ghir setAlert 

       //state and setstate (react resume)
       const [formData, setFormData] = useState({
              name: '',
              email: '',
              password: '',
              password2: ''
       });
       //destructuring
       const { name, email, password, password2 } = formData;

       const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });//we copy object formData and  [e.target.name] hia [name,email, pass , pass2] cause si chfti f input ktchof name chno fiha and dakshi li endna f value howa li kidkhlo user kndkhloh l' attribut  [e.target.name] o apres kisave f formDatatc'est (settate)

       const  onSubmit = async e => {
              e.preventDefault ();//since it's a submit so he wont submit this prevent (empecher) de faire sa default event which is sumbit
              if(password !== password2)
              setAlert("Password doesn't match!", "danger");//drna props.setAlert hit setAlert it s an object jbnah mn action but since drna destructuring lfoq l props we call it just setAlert bla props
              else{
                     register( {name, email, password});
                   /*  const newUser = {
                            name : name, //or just name since same name
                            email,
                            password
                     }

                     try {
                            const config = {
                                   headers: {
                                          'Content-Type' : 'application/json' //type of input data (body) bhal postman
                                   }
                            }

                            const body = JSON.stringify(newUser); // convertir de json à string input
                            const res = await axios.post('/api/users', body, config);//no need to put localhost we put it on the proxy and axios  est une bibliothèque JavaScript fonctionnant comme un client HTTP like postman
                            console.log(res.data);//doit envoyer le token
                     }catch(err) {
                            console.error(err.response.data);
                     }*/
              }
              
       }

       //Redirect if already logged in
       if(isAuthenticated){
       return (<Navigate to="/dashboard" />)
     }
       
       return ( <React.Fragment>
            
                     <h1 className="large text-primary">Sign Up</h1>
                     <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>


                     <form className="form" onSubmit = { e => onSubmit(e)}>

                            <div className="form-group">
                                   <input type="text" placeholder=" Full Name"
                                   name= "name" 
                                   value= {name}
                                   onChange = { e => onChange(e)} 
                                   /*required  shows wahed leiba dial khask dkhl full nom*/ />
                            </div>

                            <div className="form-group">
                                   <input type="email" placeholder="Email Address" 
                                   name="email"
                                   value= {email}
                                   onChange = { e => onChange(e)} 
                                   /*required */ />
                                   <small className="form-text"
                                   >This site uses Gravatar so if you want a profile image, use a
                                          Gravatar email</small>
                            </div>

                            <div className="form-group">
                                   <input
                                          type="password"
                                          placeholder="Password"
                                          name="password"
                                          value= {password}
                                          onChange = { e => onChange(e)} 
                                          /*minLength="6"*/ />
                            </div>
                            <div className="form-group">
                                   <input
                                          type="password"
                                          placeholder="Confirm Password"
                                          name="password2"
                                          value= {password2}
                                          onChange = { e => onChange(e)} 
                                          /*minLength="6"*/ />
                            </div>
                            <input type="submit" className="btn btn-primary" value="Register" />
                     </form>
                     <p className="my-1">
                            Already have an account?<Link to="/login">Sign In</Link>
                     </p>
              </React.Fragment>);
    
};

Register.propTypes = {
       setAlert : PropTypes.func.isRequired, //ptfr
       register : PropTypes.func.isRequired, 
       isAuthenticated : PropTypes.bool, //ptb

}

const mapStateToProps = state =>({//get states from reducers
       isAuthenticated: state.auth.isAuthenticated//we got the auth state from reducers
     })
     
export default connect(mapStateToProps, {setAlert, register })(Register);//so we can used connect de redux ---1-argument : any state we wanna map. 2 argument :allows us to access props.setAlert which is availble within a props/ argmt howa f example hna setAlert well we can put an object with any actions we wanna use
