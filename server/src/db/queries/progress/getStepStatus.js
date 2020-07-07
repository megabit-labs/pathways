const Query = require('../../core/Query')


const getUserStepStatus = ({username, stepIds}) => {
    return new Query({
        statement: `
        MATCH (u:User {username: "hedonhermdev"}), (s:Step)
        WHERE s.id IN $stepIds
        OPTIONAL MATCH (u)-[r]->(s)
        RETURN CASE 
            WHEN r IS NOT NULL THEN type(r)
            ELSE "NOT_STARTED"
        END
    `,
        params: {username: username, stepIds: stepIds}
    })
}

module.exports = getUserStepStatus
