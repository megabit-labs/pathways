import * as actionTypes from './actionTypes';

export const userLogin = (payload) => {
  return {
    type: actionTypes.USER_LOGIN,
    pathway: payload,
  }
};
