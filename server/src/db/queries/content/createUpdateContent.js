const Query = require('../../core/Query')

// Create or update a content node
const createUpdateContent = ({id, title, content}) => {
    return new Query({
        statement: `
        MERGE (c:Content {id: $id})
        SET c.content = $content, c.title = $title
        RETURN c
        `,
        params: {
            id,
            title,
            content
        }
    })
}

module.exports = createUpdateContent
