const Query = require('../../core/Query')

const createUser = ( { username = null, name = null }) => {

    if ( username === null ||  name === null ) {
        throw new Error('User.createUser: Username or name cannot be null.')
    }

    const query = new Query({
        statement: `
            CREATE (u:User $params) RETURN u;
        `,
        params: { params: args }
    })

    return query
}


module.exports = createUser
