const Query = require("../../core/Query")
const { createMatchParams } = require("../../../utils/cypherUtils")

const findOne = ({ id = null, username = null, name = null, email = null }) => {
    const args = {
        id: id,
        username: username,
        name: name,
        email: email,
    }

    Object.keys(args).forEach((key) =>
        args[key] === null ? delete args[key] : null
    )

    if (Object.keys(args).length === 0) {
        throw new Error("User.findOne: No arguments provided")
    }

    const { queryString, params } = createMatchParams(args)

    const query = new Query({
        statement: `
            MATCH (u:User ${queryString} ) RETURN u
        `,
        params: {
            ...params,
        },
    })

    return query
}

// const query = findOne({id: "user_1"})
// console.log(query.statement)
// console.log(query.params)

module.exports = findOne
