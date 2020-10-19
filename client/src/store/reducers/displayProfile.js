import {profileData} from '../shared/profileData';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    content: profileData,
    isLoggedIn: false
};

const reducer = ( state = initialState, action ) => {
    switch(action.type) {
        case actionTypes.USER_LOGIN: {
            return {
                ...state,
                isLoggedIn: true
            }
        }
        default: return state;
    }
};

export default reducer;