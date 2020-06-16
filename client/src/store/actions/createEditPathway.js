import * as actionTypes from './actionTypes'

export const addStep = (stepData) => {
    return {
        type: actionTypes.ADD_STEP,
        stepData: stepData
    }
}

export const reorderSteps = () => {
    return {
        type: actionTypes.REORDER_STEPS,
        result: result
    }
}