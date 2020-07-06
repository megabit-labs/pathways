const Query = require('../../core/Query')


const getUserStepStatus = ({username, stepId}) => {
    return new Query({
        statement: `
        MATCH (u:User {username: $username})-[r]->(s:Step {id: $stepId})
        RETURN type(r)
        `,
        params: {username, stepId}
    })
}

module.exports = getUserStepStatus
