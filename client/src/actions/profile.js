
import axios from 'axios';
import { setAlert } from './alert';
import { 
    CLEAR_PROFILE, 
    GET_REPOS, 
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE, 
    ACCOUNT_DELETED
 } from './types';



//GET current user profile
export const getCurrentProfile = () => async (dispatch) =>{
    try {
        const res = await axios.get('api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data//contains profile and user data 
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

//GET profile by id
export const getProfileById = (userId) => async (dispatch) =>{
    try {

        console.log("abir");
        const res = await axios.get('/api/profile/user/'+userId);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}


//GET Github Repos
export const getGithubRepos = (username) => async (dispatch) =>{
    try {
        const res = await axios.get('api/profile/github/'+username);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}


//GET all profiles
export const getProfiles = () => async (dispatch) =>{
    console.log("abir");
    try {
        dispatch({
            type: CLEAR_PROFILE,//clear profile
        })
        const res = await axios.get('api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data//contains profile and user data 
             })
            console.log(res.data);  

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}



//Create or update profile

export const createProfile = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
      



        const res = await axios.post('/api/profile', formData, config);
        //console.log(res.data);
        dispatch({
            type: GET_PROFILE,
            payload: res.data//contains profile and user data 
        });

       
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            //envoyer l'erreur l setAlert to show the alert mn alert component
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));//get array d errors li kaynin f backend bhal email required mot de pass doesnt match
        }
        
        dispatch({//send to auth reducer to delete the token that exists bash mayqdrch idkhl mazal (hit matalan drt inscription o 3tawni token jdid  so endi acces l compte diali o drt inscription khra li makhdamash rah mabqash endi acces l compte qdim so token qdim khaso othiyed)
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }

}

// Add experience

export const addExperience = (formData) => async dispatch =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Experience Added', 'success'));
        //history.push('/dashboard');
       
    } catch (error) {
        const {errors} = error.response.data;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            console.log(error)
        }
        
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}



// Add education

export const addEducation = (formData) => async dispatch =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/education', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Education Added', 'success'));
        //history.push('/dashboard');
       
    } catch (error) {
        const {errors} = error.response.data;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            console.log(error)
        }
        
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}



// Delete experience

export const deleteExperience = (id) => async dispatch => {
    try {
        const res = await axios.delete('/api/profile/experience/' + id);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Experience deleted', 'success'));
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}



// Delete experience

export const deleteEducation = (id) => async dispatch => {
    try {
        const res = await axios.delete('/api/profile/education/' + id);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Education deleted', 'success'));
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}



// Delete account & profile

export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure? ')){   
        try {
            await axios.delete('/api/profile/');
            dispatch({
                type: CLEAR_PROFILE,
            })
            dispatch({
                type: ACCOUNT_DELETED,
            })
    
            dispatch(setAlert('You account has been removed'));
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: error.response.statusText, status: error.response.status}
            })
        }
    }
}








