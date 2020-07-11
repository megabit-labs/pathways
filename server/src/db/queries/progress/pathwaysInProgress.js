const Query = require('../../core/Query')

const pathwaysInProgress = ({ username }) => {
    return new Query({
        statement: `
        MATCH (u:User {username: $username})-[r:PROGRESS_STATUS]->(s:Step)-[rp:HAS_PARENT_PATHWAY]->(p:Pathway)
        RETURN p`,
        params: { username: username },
    })
}

module.exports = pathwaysInProgress
