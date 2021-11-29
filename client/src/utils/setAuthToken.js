import axios from 'axios';


//si token existe (dans le localstorage) on ajoute le x-auth-token au header sinn on la supprime du header
const setAuthToken = token_code =>{
    if(token_code) {
        axios.defaults.headers.common['x-auth-token'] = token_code;    
    }else {
        delete axios.defaults.headers.common['x-auth-token'];
    }

}

export default setAuthToken;