const Query = require('../../core/Query')
const Model = require('../../core/Model')

const convertToProp = (step) => {
    let prop = {
        ...step,
        stepDataId: Model.generateId('StepData')
    }

    if (!step.isPathway) {
        prop.stepContentId = Model.generateId('StepContent')
    } 

    delete step.isPathway
    return prop
}

const createPathwaySteps = ({id, createSteps}) => {
    const props = {
        pathwayProps: [],
        contentProps: []
    }

    createSteps.forEach((step) => {
        step.isPathway ? props.pathwayProps.push(convertToProp(step))
                       : props.contentProps.push(convertToProp(step))
    })

    console.log("Creating new steps ran")
    console.log(props)

    return new Query({
        statement: `
        MATCH (p:Pathway {id: $id})
            FOREACH (prop IN $contentProps | 
                CREATE (sd:Step {id: prop.stepDataId, name: prop.name, difficulty: prop.difficulty, index: prop.index, isPathway: false})
                CREATE (sc:Content {id: prop.stepContentId, content: prop.content})
                MERGE (p)<-[:HAS_PARENT_PATHWAY]-(sd)-[:HAS_CONTENT]->(sc)
            )
        WITH p
            FOREACH (prop IN $pathwayProps | 
                CREATE (sd:Step {id: prop.stepDataId, name: prop.name, difficulty: prop.difficulty, index: prop.index, isPathway: true})
                MERGE (p1:Pathway {id: prop.pathwayId})
                MERGE (p)<-[:HAS_PARENT_PATHWAY]-(sd)-[:INCLUDES]->(p1)
            )
        RETURN p
        `,
        params: {
            pathwayProps: props.pathwayProps,
            contentProps: props.contentProps,
            id,
        }
    })
}

const updatePathwaySteps = ({id, updateSteps}) => {
    const steps = []
    updateSteps.forEach((step) => {
        steps.push(convertToProp(step));
    })

    console.log("Updating steps")
    console.log(steps)

    return new Query({
        statement: `
        MATCH (p:Pathway {id: $id})
        WITH p
        UNWIND $steps as upd
        WITH p, upd
        MATCH (p)<-[:HAS_PARENT_PATHWAY]-(s:Step {id: upd.id})
        SET s.name = upd.name, s.difficulty = upd.difficulty, s.index = upd.index
        RETURN p
        `,
        params: {
            steps,
            id,
        }
    })

}

const deletePathwaySteps = ({id, deleteSteps}) => {
    const steps = []
    deleteSteps.forEach((step) => {
        steps.push(convertToProp(step));
    })

    console.log("Deleting steps")
    console.log(steps)

    return new Query({
        statement: `
        MATCH (p:Pathway {id: $id})
        WITH p
        UNWIND $steps as del
        WITH p, del
        MATCH (p)<-[:HAS_PARENT_PATHWAY]-(s:Step{id: del.id})
        DETACH DELETE s
        RETURN p
        `,
        params: {
            steps,
            id,
        }
    })
}

const modifyPathwaySteps = ({id, createSteps, updateSteps, deleteSteps}) => {
    if (createSteps.length) {
        return createPathwaySteps({id, createSteps});
    } else if (updateSteps.length) {
        return updatePathwaySteps({id, updateSteps});
    } else {
        return deletePathwaySteps({id, deleteSteps});
    }
}

module.exports = modifyPathwaySteps
