import {profileData} from '../shared/profileData';
import * as actionTypes from '../actions/actionTypes';

const username = localStorage.getItem("username")

const initialState = {
    contentExisting: profileData,
    content: null,
    username: username,
    isLoggedIn: (username !== null)
};

const reducer = ( state = initialState, action ) => {
    switch(action.type) {
        case actionTypes.USER_LOGIN: {
            localStorage.setItem("isLoggedIn", true)
            if("username" in action.payload) {
                localStorage.setItem("username", action.payload.username)
            }
            return {
                ...state,
                username: action.payload.username,
                isLoggedIn: true
            }
        }

        case actionTypes.USER_LOGOUT: {
            localStorage.setItem("isLoggedIn", false)
            if(localStorage.getItem("username") !== null) {
                localStorage.removeItem("username")
            }

            return {
                ...state,
                username: null,
                isLoggedIn: false
            }
        }

        case actionTypes.UPDATE_PROFILE: {
            if(JSON.stringify(action.payload) === JSON.stringify(state.content)) {
                return state
            } else {
                return {
                    ...state,
                    content: action.payload
                }
            }
        }

        default: return state;
    }
};

export default reducer;