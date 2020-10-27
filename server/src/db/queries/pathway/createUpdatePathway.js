const Query = require('../../core/Query')
const Model = require('../../core/Model')

const createUpdatePathway = ({
    id,
    name,
    steps,
    tags,
    description,
    username,
}) => {
    return new Query({
        statement: `
            MERGE (p:Pathway {id: $id})
            SET p.name = $name
            SET p.description = $description
            SET p.lastModified = localdatetime()
            WITH p
            MATCH (u {username: $username})
            WITH p, u
            MERGE (u)-[:HAS_CREATED]->(p)
            WITH p
            UNWIND $tags as tag
            MERGE (t:Tag {name: tag})
            MERGE (p)-[:HAS_TAG]->(t)
            WITH distinct p
            UNWIND $steps as step
            MERGE (s:Step {id: step.id})
            SET s.name = step.name, s.time = step.time, s.index = step.index, s.stepType = step.stepType
            WITH s, step, p
            OPTIONAL MATCH (s)-[r]->() DELETE r
            MERGE (s)-[:HAS_PARENT_PATHWAY]->(p)
            WITH s, step, p
            MATCH (n {id: step.typeId})
            MERGE (s)-[:INCLUDES]->(n)
            RETURN p
        `,
        params: {
            id,
            name,
            steps,
            tags,
            description,
            username,
        },
    })
}

module.exports = createUpdatePathway
