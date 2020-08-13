import * as actionTypes from '../actions/actionTypes'

const initialState = {
    pathwayTrail: [],
}

const addNewPathway = (state, action) => {
    let pathwayTrail = [...state.pathwayTrail]
    let pos = -1
    for (let i = 0; i < pathwayTrail.length; i+=1) {
        if (pathwayTrail[i].id === action.pathway.id) {
            pos = i
            break
        }
    }
    if (pos !== -1) {
        pathwayTrail = pathwayTrail.slice(0, pos + 1)
    } else {
        pathwayTrail.push(action.pathway)
    }
    return {
        ...state,
        pathwayTrail: pathwayTrail,
    }
}

const popLastPathway = (state) => {
  let pathwayTrail = [...state.pathwayTrail];
  pathwayTrail = pathwayTrail.slice(0, pathwayTrail.length - 1);
  return {
    ...state,
    pathwayTrail: pathwayTrail,
  };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_NEW_PATHWAY:
            return addNewPathway(state, action)
        case actionTypes.POP_LAST_PATHWAY:
            return popLastPathway(state)
        default:
            return state
    }
}

export default reducer
