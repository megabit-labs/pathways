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
    pathwayName: '',
    pathwayDescription: '',
    pathwayTags: [],
    stepOrder: ['step1', 'step2', 'step3'],
    steps: {
        step1: {
            heading: 'This is a pathway step',
            content: '# hello',
            stepType: 'Pathway',
            selected: false,
            timeLimit: 20,
            isPreview: false,
            // rating: 2
        },
        step2: {
            heading: 'This is a content step',
            content: '# hello',
            stepType: 'Content',
            selected: false,
            timeLimit: 30,
            isPreview: false,
            // rating: 1
        },
        step3: {
            heading: 'This is a shared step',
            content: '# hello',
            stepType: 'Shared Step',
            selected: false,
            timeLimit: 40,
            isPreview: false,
            // rating: 3
        },
    },
    selectedStep: '',
}

const addStep = (state, action) => {
    const id = generateId('Step')
    action.stepData[id] = id

    const newStepOrder = state.stepOrder.concat(id)

    let newSteps = { ...state.steps }
    newSteps[id] = action.stepData

    return {
        ...state,
        stepOrder: newStepOrder,
        steps: newSteps,
    }
}

const reorderSteps = (state, action) => {
    const result = action.result
    const newSteps = Array.from(state.stepOrder)
    const [removed] = newSteps.splice(result.source.index, 1)
    newSteps.splice(result.destination.index, 0, removed)

    return {
        ...state,
        stepOrder: newSteps,
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
        stepOrder: newStepOrder,
    }
}

const selectStepForEditing = (state, action) => {
    let newSteps = { ...state.steps }
    if (state.selectedStep != '') {
        newSteps[state.selectedStep].selected = false
    }

    newSteps[action.stepId].selected = true

    return {
        ...state,
        steps: newSteps,
        selectedStep: action.stepId,
    }
}

const selectStepForPreview = (state, action) => {
    let newSteps = { ...state.steps }
    let isPreview = newSteps[state.selectedStep]['isPreview']

    newSteps[action.stepId].isPreview = !isPreview
    return {
        ...state,
        steps: newSteps,
    }
}

const updateStep = (state, action) => {
    const id = action.stepId
    let updatedStep = state.steps[id]
    updatedStep = {
        ...updatedStep,
        ...action.stepData,
    }
    const updatedSteps = { ...state.steps }
    updatedSteps[id] = updatedStep

    return {
        ...state,
        steps: updatedSteps,
    }
}

const updatePathwayDetails = (state, action) => {
    return {
        ...state,
        pathwayName: action.name,
        pathwayDescription: action.description,
    }
}

const addTag = (state, action) => {
    let tags = [...state.pathwayTags]
    tags.push(action.tag)
    return {
        ...state,
        pathwayTags: tags,
    }
}

const removeTag = (state, action) => {
    let tags = [...state.pathwayTags]
    let finalTags = tags.filter((tag) => tag !== action.tag)
    return {
        ...state,
        pathwayTags: finalTags,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_STEP:
            return addStep(state, action)
        case actionTypes.REORDER_STEPS:
            return reorderSteps(state, action)
        case actionTypes.DELETE_STEP:
            return deleteStep(state, action)
        case actionTypes.SELECT_FOR_EDITING:
            return selectStepForEditing(state, action)
        case actionTypes.UPDATE_STEP:
            return updateStep(state, action)
        case actionTypes.SELECT_FOR_PREVIEW:
            return selectStepForPreview(state, action)
        case actionTypes.UPDATE_PATHWAY_NAME:
            return updatePathwayDetails(state, action)
        case actionTypes.ADD_TAG:
            return addTag(state, action)
        case actionTypes.REMOVE_TAG:
            return removeTag(state, action)
        default:
            return state
    }
}

export default reducer
