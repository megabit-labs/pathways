const Query = require("../../core/Query")

const updateStepStatus = ({ username, stepId, status }) => {
    return new Query({
        statement: `
        MATCH (u:User {username: $username}), (s:Step {id: $stepId})
        MERGE (u)-[r:PROGRESS_STATUS]->(s)
        WITH u, s
        CALL apoc.do.case([
            $status =~ "HAS_COMPLETED", 
            'MERGE (u)-[r:PROGRESS_STATUS]->(s)
             SET r.status = "HAS_COMPLETED" 
             RETURN r.status',
            $status =~ "IN_PROGRESS",
            'MERGE (u)-[r:PROGRESS_STATUS]->(s)
             SET r.status = "IN_PROGRESS"
             RETURN r.status',
            $status =~ "NOT_STARTED",
            'OPTIONAL MATCH (u)-[r:PROGRESS_STATUS]->(s)
             DELETE r
             RETURN "NOT_STARTED"'
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
