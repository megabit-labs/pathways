const Query = require("../../core/Query")

const createUser = ({
    username = null,
    name = null,
    password = null,
    email = null,
}) => {
    const args = {
        username,
        name,
        password,
        email,
    }

    Object.keys(args).forEach((key) =>
        args[key] === null ? delete args[key] : null
    )

    if (Object.keys(args).length === 0) {
        throw new Error("User.findOne: No arguments provided")
    }

    if (username === null || name === null) {
        throw new Error("User.createUser: Username or name cannot be null.")
    }

    const query = new Query({
        statement: `
            CREATE (u:User $params) RETURN u;
        `,
        params: { params: args },
    })

    return query
}

module.exports = createUser
