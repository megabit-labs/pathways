const Query = require('../../core/Query')


const getUserStepStatus = ({username, stepIds}) => {
    return new Query({
        statement: `
        UNWIND $stepIds as stepId
        MATCH (u:User {username: $username}), (s:Step {id: stepId})
        OPTIONAL MATCH (u)-[r]->(s)
        RETURN CASE 
            WHEN r IS NOT NULL THEN r.status
            ELSE "NOT_STARTED"
        END
    `,
        params: {username: username, stepIds: stepIds}
    })
}

module.exports = getUserStepStatus
