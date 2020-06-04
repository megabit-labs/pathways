const Query = require('../../core/Query')

const findOne = ({id=null, username=null, name=null}) => {
    const args = {
        id: id,
        username: username,
        name: name
    }

    Object.keys().forEach((key) => args[key] === null ? delete args[key] : null)
    if (Object.keys().length === 0) {
        throw new Error('User.findOne: No arguments provided')
    }

    const query = new Query({
        statement: `
            MATCH (u:User $params) RETURN u
        `,
        params: args
    })

    return query
}

module.exports = findOne