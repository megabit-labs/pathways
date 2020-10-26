const Query = require('../../core/Query')

const deleteStep = ({ id }) => {
    return new Query({
        statement: `
            MATCH (s:Step {id: $id})
            WITH s
            OPTIONAL MATCH (s)-[r]->(c:Content)
            DETACH DELETE s
        `,
        params: {
            id,
        },
    })
}

module.exports = deleteStep
