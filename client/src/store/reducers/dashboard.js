import * as actionTypes from '../actions/actionTypes'

const initialState = {
    activeTab: "Ongoing"
}

const changeTab = (state, action) => {
    return {
        ...state,
        activeTab: action.tabName
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_TAB: return changeTab(state, action)
        default: return state
    }
}

export default reducer