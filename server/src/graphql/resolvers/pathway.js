const queries = require('../../db/queries/queries')

const resolver = {
    Mutation: {
        async createUpdatePathway(_, {id, name, steps, tags}) {
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
        },
        async createUpdateContent(_, {id, title, content}) {
            const query = queries.content.createUpdateContent({
                id, title, content 
            })

            try {
                await query.run()
                return { status: 'OK', message: null}
            } catch (e) {
                return { status: 'ERROR', message: e.toString() }
            }
        },
        async forkContent(_, {id, title, content, stepId}) {
            const query = queries.content.createUpdateContent({
                id, title, content, stepId
            })

            try {
                await query.run()
                return { status: 'OK', message: null}
            } catch (e) {
                return { status: 'ERROR', message: e.toString() }
            }
        },
        async updateUserStepStatus(_, {username, stepId, status}) {
            const query = queries.user.updateStepStatus({
                username, stepId, status
            })

            try {
                await query.run()
                return { status: 'OK', message: null}
            } catch (e) {
                return {status: 'ERROR', message: e.toString() }
            }
        }
    },
    Step: {
        async userStatus(parent, _, context) {
            const user = context.user
            if (user == null) {
                return "NOT_STARTED"
            }

            const username = user.username
            const stepId = parent.id
            const query = queries.user.getStepStatus({
                username, stepId
            })

            let status = ''

            const result = await query.run()

            if (result.records.length == 0) {
                status = 'NOT_STARTED'
            } else {
                status = result.records[0].get(0)
            }


            console.log(result)

            return status
        }
    }
}

module.exports = resolver
