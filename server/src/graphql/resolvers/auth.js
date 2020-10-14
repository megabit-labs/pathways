const queries = require('../../db/queries/queries')

const User = require('../../db/models/user')
const ghOAuth = require('../../utils/ghOAuth')

const resolver = {
    Mutation: {
        async GithubAuth(_, { code }) {
            let accessToken = ''
            try {
                accessToken = await ghOAuth.getGHAccessToken(code)
            } catch (e) {
                return { status: 'ERROR', message: e.toString(), token: null }
            }

            let ghUser = ''
            try {
                ghUser = await ghOAuth.getGHUser(accessToken)
            } catch (e) {
                return { status: 'ERROR', message: e.toString(), token: null }
            }

            const query = queries.user.findOne({ username: ghUser.username })

            let result = null
            try {
                result = await query.run()
            } catch (e) {
                return { status: 'ERROR', message: e.toString(), token: null }
            }

            if (result.records.length === 0) {
                // If user does not exist create a new user
                try {
                    const newQuery = queries.user.createUser(ghUser)
                    result = await newQuery.run()
                    console.log(result)
                } catch (e) {
                    return {
                        status: 'ERROR',
                        message: e.toString(),
                        token: null,
                    }
                }
            }

            const { records } = result

            const userNode = records[0].get(0)
            const user = new User(userNode)

            console.log(user)

            const jwt = user.generateToken()
            console.log('JWT', jwt)

            return {
                status: 'OK',
                message: null,
                token: jwt,
                username: user.username,
            }
        },
    },
}

module.exports = resolver
