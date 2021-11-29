import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [];

export default function (state= initialState, action) {
    
    //Destructuring
    const {type, payload} = action;//payload howa li fih id / msg et type
    switch (type) {
        case SET_ALERT://we dispatched (envoyer) SET_Alert
            return [...state, payload];//add the new alert (new state that contains msg/id/typealert) to the initial states (initial alerts)
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}