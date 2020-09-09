import * as actionTypes from './actionTypes'

export const addStep = (stepData) => {
    return {
        type: actionTypes.ADD_STEP,
        stepData: stepData,
    }
}

export const reorderSteps = (result) => {
    return {
        type: actionTypes.REORDER_STEPS,
        result: result,
    }
}

export const deleteStep = (stepId) => {
    return {
        type: actionTypes.DELETE_STEP,
        stepId: stepId,
    }
}

export const selectForEditing = (stepId) => {
    return {
        type: actionTypes.SELECT_FOR_EDITING,
        stepId: stepId,
    }
}

export const selectForPreview = (stepId) => {
    return {
        type: actionTypes.SELECT_FOR_PREVIEW,
        stepId: stepId,
    }
}

export const updateStep = (stepId, stepData) => {
    return {
        type: actionTypes.UPDATE_STEP,
        stepId: stepId,
        stepData: stepData,
    }
}

export const updatePathwayDetails = (name, description) => {
    return {
        type: actionTypes.UPDATE_PATHWAY_NAME,
        name: name,
        description: description,
    }
}

export const addTag = (tag) => {
    return {
        type: actionTypes.ADD_TAG,
        tag: tag,
    }
}

export const removeTag = (tag) => {
    return {
        type: actionTypes.REMOVE_TAG,
        tag: tag,
    }
}