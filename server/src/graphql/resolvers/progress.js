const queries = require("../../db/queries/queries")
const Dataloader = require("dataloader")

const getStatusBatch = async (keys) => {
    const username = keys[0].username
    const stepIds = keys.map((key) => key.stepId)

    const query = queries.progress.getStepStatus({username, stepIds})

    const result = await query.run()
    return result.records.map(status => status.get(0))

}

const stepStatusLoader = new Dataloader((keys) => getStatusBatch(keys))


const resolver = {
    Step: {
        async userStatus(parent, _, context, info) {
            const user = context.user
            if (user == null) {
                return "NOT_STARTED"
            }

            const username = user.username
            console.log(username)
            const stepId = parent.id

            return await stepStatusLoader.load({ username, stepId })
        }
    },
    Mutation: {
        async updateUserStepStatus(_, {username, stepId, status}) {
            const query = queries.progress.updateStepStatus({
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
}
module.exports = resolver
