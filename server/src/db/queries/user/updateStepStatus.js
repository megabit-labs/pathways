const Query = require("../../core/Query")

const updateStepStatus = ({ username, stepId, status }) => {
    return new Query({
        statement: `
        MATCH (u:User {username: $username}), (s:Step {id: $stepId})
        OPTIONAL MATCH (u)-[prev]->(s)
        DELETE prev
        WITH u, s
        CALL apoc.do.case([
            $status =~ "HAS_COMPLETED", 
            'CREATE (u)-[r:HAS_COMPLETED]->(s) RETURN type(r)',
            $status =~ "IN_PROGRESS",
            'CREATE (u)-[r:IN_PROGRESS]->(s) RETURN type(r)',
            $status =~ "NOT_STARTED",
            'RETURN null'
        ],
        '',
        {u:u, s:s}
        )
        YIELD value
        RETURN value
        `,
        params: { username, stepId, status },
    })
}

module.exports = updateStepStatus
