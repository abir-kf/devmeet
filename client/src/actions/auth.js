import axios from 'axios';//car ici fin atkon connection m3a back
import { setAlert } from './alert';
import { 
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    USER_LOADED, 
    AUTH_ERROR, 
    LOGIN_FAIL,    
    LOGIN_SUCCESS,
    CLEAR_PROFILE,
    LOGOUT, 
    

 } from './types';
 import setAuthToken from '../utils/setAuthToken';



//Load user(v: 8/2)
export const loadUser = () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);//call function in utils
    }

    try {
        const res = await axios.get('api/auth');//verifie si on a le right toke

        dispatch({
            type: USER_LOADED,
            payload: res.data,//contains user(nom - mail - avatar - token..) table sans le password
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
}


//Register User (v :8/1)
export const register = ({name, email, password}) => async dispatch => {
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({name, email, password});//convertir de string à json pour les put f backend de type json
    try {
        const res = await axios.post('/api/users', body, config);
        dispatch({//send to auth d reducer pour enregister token jdid 
            type: REGISTER_SUCCESS,
            payload: res.data
        });
       dispatch(loadUser());// to load data (user : mail,name,token..) loadUser exists in this file
    } catch (err) {
        const {errors} = err.response.data.errors;
        if(errors){
            //envoyer l'erreur l setAlert to show the alert mn alert component
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));//get array d errors li kaynin f backend bhal email required mot de pass doesnt match
        }
        
        dispatch({//send to auth reducer to delete the token that exists bash mayqdrch idkhl mazal (hit matalan drt inscription o 3tawni token jdid  so endi acces l compte diali o drt inscription khra li makhdamash rah mabqash endi acces l compte qdim so token qdim khaso othiyed)
            type: REGISTER_FAIL
        });
    }
}







//Login User
export const login = (email, password) => async dispatch => {// nqdro ndkhlohom bhal haka as an object({email, password})
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email, password});
    try {
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());

    } catch (error) {
        const {errors} = error.response.data;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        
        dispatch({
            type: LOGIN_FAIL
        });
    }
}


//Logout
export const logout = () => dispatch =>{
    dispatch({
        type: CLEAR_PROFILE
    })
    dispatch({
        type: LOGOUT
    })
}