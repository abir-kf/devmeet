import { SET_ALERT, REMOVE_ALERT } from "./types";
//import uuid from 'uuid';//get a random id
import {v4 as uuid4} from "uuid";

//setAlert it s an object fih type o payload(id , msg ,alerttype)
export const setAlert = (msg, alertType) => dispatch => {
   // const id = Math.floor(Math.random() * 1000);(random)
   const id = uuid4(); 
   dispatch({//send it to alert.js li f reducers
        type: SET_ALERT,
        payload: {msg, alertType, id}
    });

    //js function that removes the alerts apres un certain temps
     setTimeout(() => dispatch({//send it to alert.js li f reducers
        type: REMOVE_ALERT,
        payload: id
    }), 5000);


};