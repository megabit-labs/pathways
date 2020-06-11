const Query = require('../../core/Query')
const Model = require('../../core/Model')

const createUpdatePathway = ({id, name, steps}) => {
    // create id for path if doesn't exist
    if (!id) {
        id = Model.generateId('Pathway')
    }
    // create ids for new steps
    steps.filter((step) => !step.id).forEach((step) => {
        step.id = Model.generateId('Step')
    });

    // split into two types where content is a pathway or not
    // IMPROVEMENT: Use APOC extension to make a conditional query
    const pathwaySteps = []
    const contentSteps = []
    steps.forEach((step) => {
        step.isPathway ? pathwaySteps.push(step) : contentSteps.push(step)
    });

    return new Query({
        statement: `
        MERGE (p:Pathway {id: $id})
        SET p.name = $name
        WITH p
        UNWIND $pathwaySteps AS step
            MERGE (s:Step {id: step.id})
            SET s.name = step.name, s.time = step.time, s.index = step.index
            WITH s, p, step
            OPTIONAL MATCH (s)-[r1:HAS_CONTENT]->(:Content)
            OPTIONAL MATCH (s)-[r2:INCLUDES]->(:Pathway)
            DELETE r1, r2
            MERGE (:Pathway {id: step.typeId})<-[r:INCLUDES]-(s)
            MERGE (p)<-[:HAS_PARENT_PATHWAY]-(s)
        WITH distinct p
        UNWIND $contentSteps AS step
            MERGE (s:Step {id: step.id})
            SET s.name = step.name, s.time = step.time, s.index = step.index, s.isPathway = step.isPathway
            WITH s, p, step
            OPTIONAL MATCH (s)-[r1:HAS_CONTENT]->(:Content)
            OPTIONAL MATCH (s)-[r2:INCLUDES]->(:Pathway)
            DELETE r1, r2
            MERGE (:Content {id: step.typeId})<-[r:HAS_CONTENT]-(s)
            MERGE (p)<-[:HAS_PARENT_PATHWAY]-(s)
        RETURN distinct p
        `,
        params: {
            id,
            name,
            pathwaySteps,
            contentSteps
        }
    })
}

module.exports = createUpdatePathway
