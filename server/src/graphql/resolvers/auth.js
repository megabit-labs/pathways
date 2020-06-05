const axios = require("axios");

const queries = require("../../db/queries/queries");
const secrets = require("../../secrets");

const User = require("../../db/models/user");

function generateRandomPassword() {
    return Math.random().toString(36).slice(-8);
}

async function getGHAccessToken(code) {
    const ghUrl = "https://github.com/login/oauth/access_token";
    const ghResponse = await axios.get(ghUrl, {
        headers: {
            Accept: "application/json",
        },
        params: {
            client_id: secrets.GH_CLIENT_ID,
            client_secret: secrets.GH_CLIENT_SECRET,
            code: code,
        },
    });
    console.log('HERE')
    if (ghResponse.data.hasOwnProperty("error")) {
        throw new Error("GitHub: Invalid code.");
    }

    console.log('HERE')
    return ghResponse.data.access_token;
}

async function getGHUser(accessToken) {
    const ghUrl = "https://api.github.com/user";

    const ghResponse = await axios.get(ghUrl, {
        headers: {
            Authorization: "token " + accessToken,
        },
    });

    if (ghResponse.status != 200) {
        throw new Error("Github: Invalid access token");
    }

    return {
        username: ghResponse.data.login,
        email: ghResponse.data.email,
        name: ghResponse.data.name,
    };
}

const resolver = {
    Mutation: {
        async GithubAuth(_, { code }) {
            let accessToken = "";
            try {
                accessToken = await getGHAccessToken(code);
            } catch (e) {
                return { status: "ERROR", message: e.toString(), token: null };
            }

            let ghUser = "";
            try {
                ghUser = await getGHUser(accessToken);
            } catch (e) {
                return { status: "ERROR", message: e.toString(), token: null };
            }

            console.log(ghUser)

            const query = queries.user.findOne(ghUser);

            let user = null;
            try {
                user = await query.run();
            } catch (e) {
                return { status: "ERROR", message: e.toString(), token: null };
            }

            if (user = null) {
                const query = queries.user.createUser(ghUser);
            }

            jwt = user.getJWT();

            return { status: OK, message: null, token: jwt };

            // try {
            //     await query.run()
            //     return {'status': 'OK', message: null }
            // } catch(e) {
            //     return {'status': 'ERROR', message: e.toString() }
            // }
        },
    },
};

module.exports = resolver;
