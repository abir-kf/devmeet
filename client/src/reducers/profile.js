import { 
    CLEAR_PROFILE,
    GET_PROFILE, 
    GET_REPOS, 
    UPDATE_PROFILE,
    PROFILE_ERROR,
    GET_PROFILES 

} from "../actions/types";



const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}



export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type){
            case GET_PROFILE:
            case UPDATE_PROFILE:   
                return {
                    ...state,
                    profile: payload,
                    loading: false
                };

                

            case PROFILE_ERROR:
            return {
                ...state,
                error: payload,//car on retourne l'erreur (num status et le msg d'erreur)
                loading: false
            }

            case GET_REPOS:
                return {
                    ...state,
                    repos: payload,
                    loading: false
                };

            //to make the profile vide fash logout
            case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,//car on retourne l'erreur (num status et le msg d'erreur)
                repos:[], //github repo put it in null in case can 3amer
                loading: false
            }

            case GET_PROFILES:
                return {
                    ...state,
                    profiles: payload,
                    loading: false
                };

            default:
                return state
        }
    }
