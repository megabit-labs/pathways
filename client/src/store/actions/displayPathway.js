import * as actionTypes from './actionTypes';

export const addNewPathway = (obj) => {
  return {
    type: actionTypes.ADD_NEW_PATHWAY,
    pathway: obj,
  }
};

export const popLastPathway = () => {
  return {
    type: actionTypes.POP_LAST_PATHWAY,
  };
};