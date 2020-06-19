const Query = require('../../core/Query')

// detaches a step from its content
// creates a new content node and reattaches the step to it
const forkContent = ({id, title, content, stepId}) => {
    return new Query({
        statement: `
        MATCH (s:Step {id: $stepId})
        OPTIONAL MATCH (s)-[r:HAS_CONTENT]->(:Content)
        DELETE r
        WITH s
        MERGE (c:Content {id: $id})
        SET c.content = $content, c.title = $title
        MERGE (s)-[:HAS_CONTENT]->(c)
        RETURN c.id
        `,
        params: {
            id,
            title,
            content,
            stepId
        }
    })
}

module.exports = forkContent
