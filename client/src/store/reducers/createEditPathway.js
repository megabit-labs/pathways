import * as actionTypes from '../actions/actionTypes'
import generateId from '../../utils/generateId'
/**
 * Storing step order as an array of ids and the steps in
 * a different object to decouple the order of steps (which
 * should not ideally be represented as an inherent step
 * property, since it's a group property) from the inherent
 * step properties.
 */
const initialState = {
    stepOrder: ['step1', 'step2', 'step3'],
    steps: {
        step1: {
            content: 'This is a pathway step',
            stepType: 'Pathway'
        },
        step2: {
            content: 'This is a content step',
            stepType: 'Content'
        },
        step3: {
            content: 'This is a shared step',
            stepType: 'Shared Step'
        }
    }
}

const addStep = (state, action) => {
    const id = generateId('Step')
    action.stepData[id] = id
    
    const newStepOrder = state.stepOrder.concat(id)

    let newSteps = {...(state.steps)}
    newSteps[id] = action.stepData

    return {
        ...state,
        stepOrder: newStepOrder,
        steps: newSteps
    }
}

const reorderSteps = (state, action) => {
    const result = action.result
    const newSteps = Array.from(state.stepOrder)
    const [removed] = newSteps.splice(result.source.index, 1)
    newSteps.splice(result.destination.index, 0, removed)

    return {
        ...state,
        stepOrder: newSteps
    }
}

/**
 * Remove the step from the stepOrder list so that it doesn't appear,
 * but do not delete the step's data from the steps object. This can
 * be used to give the user a restore option.
 */
const deleteStep = (state, action) => {
    let stepOrder = state.stepOrder
    const index = stepOrder.indexOf(action.stepId)
    stepOrder.splice(index, 1)
    const newStepOrder = [...stepOrder]
    
    return {
        ...state,
        stepOrder: newStepOrder
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_STEP: return addStep(state, action)
        case actionTypes.REORDER_STEPS: return reorderSteps(state, action)
        case actionTypes.DELETE_STEP: return deleteStep(state, action)
        default: return state
    }
}

export default reducer