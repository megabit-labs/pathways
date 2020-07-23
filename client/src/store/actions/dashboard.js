import * as actionTypes from './actionTypes'

export const changeTab = (tabName) => {
    return {
        type: actionTypes.CHANGE_TAB,
        tabName: tabName
    }
}