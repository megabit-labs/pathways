const Query = require('../../core/Query')
const Model = require('../../core/Model')

const createUpdateContent = ({id, title, content}) => {
    if (!id) {
        id = Model.generateId('Content')
    }
    // create or update content
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
