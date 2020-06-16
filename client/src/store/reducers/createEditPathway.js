import * as actionTypes from '../actions/actionTypes'

const initialState = {
    steps: []
}

const addStep = (state, action) => {
    const newSteps = state.steps.concat({
        ...(action.stepData)
    })

    return {
        ...state,
        steps: newSteps
    }
}

const reorderSteps = (state, action) => {
    const result = action.result
    const newSteps = Array.from(state.steps)
    const [removed] = newSteps.splice(result.source.index, 1)
    newSteps.splice(result.destination.index, 0, removed)

    return {
        ...state,
        steps: newSteps
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_STEP: return addStep(state, action)
        case actionTypes.REORDER_STEPS: return reorderSteps(state, action)
        default: return state
    }
}

export default reducer