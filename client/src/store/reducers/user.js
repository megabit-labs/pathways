import * as actionTypes from '../actions/actionTypes'

const initialState = {
    name: "Dushyant Yadav",
    bio: "Incoming Software Engineer Intern at Postman. Computer Science sophomore at BITS Pilani (Pilani Campus). Back-end developer @dvm-bitspilani",
    imageURL: "https://avatars2.githubusercontent.com/u/45326332?s=460&u=f209cea7ff01c35bc39314fe5b275014acfd098c&v=4",
    username: "dush-t",
    pathwaysCompleted: 3,
    pathwaysCreated: 7,
    pathwaysOngoing: 5
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default: return state
    }
}

export default reducer