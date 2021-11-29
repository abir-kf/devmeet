import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED, 
    AUTH_ERROR, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOGOUT,
    ACCOUNT_DELETED
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),//knakhdo mn localstorage token li fiha dik sa3a
    isAuthenticated: null,//wash dar l'authentification
    loading: true,//maerftch load wash 3na biha tloada page like t actualisa mn url ola ktbqa tloada automatiquement hit it s react/ fash ghadi tloada o isali so loading atwli = false
    user: null
}

export default function(state= initialState, action) {

    //Destructuring
    const {type, payload} = action;

    switch(type){
        case USER_LOADED:
            return {
                ...state, 
                isAuthenticated: true, 
                loading: false,//hit deja tloada
                user: payload //fih user kaml cause auth returns user sans password
            }
      
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);//kn3tiweh token jdid l initialstate = state cause cause une fois u load page kolchi kirj3 l initialstate dakshi elash bghinah ibqa endna token ((hit matalan drt inscription o 3tawni token jdid  so endi acces l compte diali o drt inscription khra li makhdamash rah mabqash endi acces l compte qdim so token qdim khaso othiyed)??) 
            return {
                ...state, 
                payload, //knzido token jdid
                isAuthenticated: true, 
                loading: false//hit deja tloada
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
        case ACCOUNT_DELETED://to remove the token
            localStorage.removeItem('token');
            return {
                ...state,
                token: null, 
                isAuthenticated: false, 
                loading: false    
            }
        
        // case USER_LOADED:
        //     return {
        //         ...state,
        //         isAuthenticated: true,
        //         loading: false,
        //         user: payload    
        //     }
        
        default:
            return state;
        
    }
}