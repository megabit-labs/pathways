const queries = require('../../db/queries/queries')

const resolver = {
    Mutation: {
        async createUpdatePathway(_, {id, name, steps}) {
            const query = queries.pathway.createUpdatePathway({
                id, name, steps
            })

            try {
                await query.run()
                return { status: 'OK', message: null }
            } catch (e) {
                return { status: 'ERROR', message: e.toString() }
            }
        },
        async deletePathway(_, {id, steps, whole}) {
            const query = queries.pathway.deletePathway({
                id, steps, whole
            })

            try {
                await query.run()
                return { status: 'OK', message: null }
            } catch (e) {
                return { status: 'ERROR', message: e.toString() }
            }
        }
    }
}

module.exports = resolver
