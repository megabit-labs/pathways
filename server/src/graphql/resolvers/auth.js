const axios = require("axios")

const queries = require("../../db/queries/queries")
const secrets = require("../../secrets")

const User = require("../../db/models/user")


async function getGHAccessToken(code) {
    const ghUrl = "https://github.com/login/oauth/access_token"
    const ghResponse = await axios.get(ghUrl, {
        headers: {
            Accept: "application/json",
        },
        params: {
            client_id: secrets.GH_CLIENT_ID,
            client_secret: secrets.GH_CLIENT_SECRET,
            code: code,
        },
    })
    if (ghResponse.data.hasOwnProperty("error")) {
        throw new Error("GitHub: Invalid code.")
    }

    return ghResponse.data.access_token
}

async function getGHUser(accessToken) {
    const ghUrl = "https://api.github.com/user"

    const ghResponse = await axios.get(ghUrl, {
        headers: {
            Authorization: "token " + accessToken,
        },
    })

    if (ghResponse.status != 200) {
        throw new Error("Github: Invalid access token")
    }

    return {
        username: ghResponse.data.login,
        email: ghResponse.data.email,
        name: ghResponse.data.name,
    }
}

const resolver = {
    Mutation: {
        async GithubAuth(_, { code }) {
            let accessToken = ""
            try {
                accessToken = await getGHAccessToken(code)
            } catch (e) {
                return { status: "ERROR", message: e.toString(), token: null }
            }

            let ghUser = ""
            try {
                ghUser = await getGHUser(accessToken)
            } catch (e) {
                return { status: "ERROR", message: e.toString(), token: null }
            }


            const query = queries.user.findOne({ username: ghUser.username })

            let result = null
            try {
                result = await query.run()
            } catch (e) {
                return { status: "ERROR", message: e.toString(), token: null }
            }

            if (result.records.length == 0) {
                // If user does not exist create a new user
                try {
                    const newQuery = queries.user.createUser(ghUser)
                    result = await newQuery.run()
                    console.log(result)
                } catch (e) {
                    return { status: "ERROR", message: e.toString(), token: null }
                }
            }
            
            const records = result.records

            const userNode = records[0].get(0)
            const user = new User(userNode)

            console.log(user)

            const jwt = user.generateToken()
            console.log("JWT", jwt)

            return { status: 'OK', message: null, token: jwt }

        },
    },
}

module.exports = resolver
