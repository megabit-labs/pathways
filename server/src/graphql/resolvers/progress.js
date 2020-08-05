const Dataloader = require('dataloader')

const { delegateToSchema } = require('graphql-tools')
const queries = require('../../db/queries/queries')

const getStatusBatch = async (keys) => {
    const { username } = keys[0]
    const stepIds = keys.map((key) => key.stepId)

    const query = queries.progress.getStepStatus({ username, stepIds })

    const result = await query.run()
    return result.records.map((status) => status.get(0))
}

const stepStatusLoader = new Dataloader((keys) => getStatusBatch(keys))

const resolver = {
    Step: {
        async userStatus(parent, _, context) {
            const { user } = context
            if (user == null) {
                return 'NOT_STARTED'
            }

            const { username } = user
            console.log(username)
            const stepId = parent.id

            return stepStatusLoader.load({ username, stepId })
        },
    },
    User: {
        async pathwaysInProgress(parent, _, context, info) {
            const { username } = parent

            const query = queries.progress.pathwaysInProgress({ username })
            const result = await query.run()

            const pathwayIds = result.records.map(
                (record) => record.get('p').properties.id
            )

            return delegateToSchema({
                schema: info.schema,
                operation: 'query',
                fieldName: 'Pathway',
                context: context,
                info: info,
                args: {
                    filter: {
                        id_in: pathwayIds,
                    },
                },
            })
        },
    },
    Mutation: {
        async updateUserStepStatus(_, { username, stepId, status }) {
            const query = queries.progress.updateStepStatus({
                username,
                stepId,
                status,
            })

            try {
                await query.run()
                return { status: 'OK', message: null }
            } catch (e) {
                return { status: 'ERROR', message: e.toString() }
            }
        },
    },
}
module.exports = resolver
