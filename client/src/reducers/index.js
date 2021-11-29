//This is the ROUTE REDUCER mnha knjibo states li bghina li fihom data

import {combineReducers} from 'redux';
import alert from './alert';//import alert reducer
import auth from './auth';
import profile from './profile';

//combining reducers
export default combineReducers({
    //reducers
    alert,
    auth,
    profile,
});