const Query = require('../../core/Query')

const deletePathway = ({id, steps, whole}) => {
    // delete the entire pathway
    if (whole) {
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
            }
        })
    } else {  // delete given steps only
        // map steps to id and name
        return new Query({
            statement: `
            MATCH (p:Pathway {id: $id})
            WITH p
            UNWIND $steps AS step
            OPTIONAL MATCH (p)<-[:HAS_PARENT_PATHWAY]-(s:Step{id: step.id})
            DETACH DELETE s
            `,
            params: {
                steps,
                id,
            }
        })
    }
}

module.exports = deletePathway
