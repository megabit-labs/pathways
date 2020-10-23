const Query = require('../../core/Query')

// Create or update a content node
const createUpdateContent = ({ id, title, content, username }) => {
    return new Query({
        statement: `
        MATCH (u:User {username: $username})
        MERGE (c:Content {id: $id})
        SET c.content = $content, c.title = $title
        SET c.lastModified = localdatetime()
        MERGE (u)-[:HAS_CREATED]->(c)
        RETURN c
        `,
        params: {
            id,
            title,
            content,
            username,
        },
    })
}

module.exports = createUpdateContent
