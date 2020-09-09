import {profileData} from '../shared/profileData';

const initialState = {
    content: profileData
};

const reducer = ( state = initialState, action ) => {
    switch(action.type) {
        default: return state;
    }
};

export default reducer;