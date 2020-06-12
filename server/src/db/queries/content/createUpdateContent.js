const Query = require('../../core/Query')
const Model = require('../../core/Model')

const createUpdateContent = ({id, content}) => {
    if (!id) {
        id = Model.generateId('Content')
    }
    // create or update content
    return new Query({
        statement: `
        MERGE (c:Content {id: $id})
        SET c.content = $content
        RETURN c
        `,
        params: {
            id,
            content
        }
    })
}

module.exports = createUpdateContent
