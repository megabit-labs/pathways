const queries = require('../../db/queries/queries')

const resolver = {
    Mutation: {
        async makePathway(_, {name, steps}) {
            const query = queries.pathway.createPathway({
                name, steps
            })

            try {
                await query.run()
                return { status: 'OK', message: null }
            } catch (e) {
                return { status: 'ERROR', message: e.toString() }
            }

            return { status: 'OK', message: null }
        },
        async modifyPathwaySteps(_, {id, createSteps, updateSteps, deleteSteps}) {
            const query = queries.pathway.modifyPathwaySteps({
                id, createSteps, updateSteps, deleteSteps
            })

            try {
                await query.run()
                return { status: 'OK', message: null }
            } catch (e) {
                return { status: 'ERROR', message: e.toString() }
            }

            return { status: 'OK', message: null }
        }
    }
}

module.exports = resolver
