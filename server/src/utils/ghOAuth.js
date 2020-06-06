const axios = require('axios')

const config = require('../../config')

axios.interceptors.request.use(request => {
  console.log('Starting Request', request)
  return request
})

async function getGHAccessToken(code) {
    const ghUrl = "https://github.com/login/oauth/access_token"
    const ghResponse = await axios.get(ghUrl, {
        headers: {
            Accept: "application/json",
        },
        params: {
            client_id: config.GITHUB_CLIENT_ID,
            client_secret: config.GITHUB_CLIENT_SECRET,
            code: code,
        },
    })
    console.log(ghResponse)
    if (ghResponse.data.hasOwnProperty("error")) {
        console.log("FAILED")
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

module.exports = {
    getGHAccessToken,
    getGHUser
}
