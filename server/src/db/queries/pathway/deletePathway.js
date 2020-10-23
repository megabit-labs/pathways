const Query = require('../../core/Query')

const deletePathway = ({ id }) => {
    // delete the entire pathway
    return new Query({
        statement: `
        MATCH (p:Pathway {id: $id})
        WITH p
        OPTIONAL MATCH (p)<-[:HAS_PARENT_PATHWAY]-(s:Step)
        DETACH DELETE s
        WITH p
        DETACH DELETE p
        `,
        params: {
            id,
        },
    })
}

module.exports = deletePathway
