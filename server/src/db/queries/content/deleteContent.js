const Query = require('../../core/Query')

const deleteContent = ({id}) => {
    // delete content and all steps related to it
    return new Query({
        statement: `
        MATCH (c:Content {id: $id})
        MATCH (c)<-[:HAS_CONTENT]-(s:Step)
        DETACH DELETE s, c
        `,
        params: {
            id,
        }
    })
}

module.exports = deleteContent
