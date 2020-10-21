import * as actionTypes from './actionTypes';

export const userLogin = (payload) => {
	return {
		type: actionTypes.USER_LOGIN,
		payload: payload,
	}
};

export const userLogout = () => {
	return {
		type: actionTypes.USER_LOGOUT
	}
}

export const updateProfile = (payload) => {
	return {
		type: actionTypes.UPDATE_PROFILE,
		payload: payload
	}
}