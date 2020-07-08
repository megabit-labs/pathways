const { ApolloServer } = require('apollo-server')
const { makeExecutableSchema } = require('apollo-server')
const { makeAugmentedSchema } = require('neo4j-graphql-js')

const driver = require('./db/connection')

const typedefs = require('./graphql/typedefs')
const resolvers = require('./graphql/resolvers')

const User = require('./db/models/user')

const AllowedForDirective = require('./graphql/directives/allowedFor')
const IsAuthenticatedDirective = require('./graphql/directives/isAuthenticated')


const schema = makeAugmentedSchema({
    typeDefs: typedefs,
    resolvers: resolvers,
    config: {
        query: true,
        mutation: false
    },
    schemaDirectives: {
        isAuthenticated: IsAuthenticatedDirective,
        allowedFor: AllowedForDirective
    }
})

const app = new ApolloServer({ 
    schema: schema, 
    context: async ({ req }) => {
        let authToken = req.header('Authorization')
        if (authToken) {
            authToken = authToken.replace('Bearer ', '')
        }
        const user = await User.findByToken(authToken)
        return {
            driver: driver,
            user: user,
            authToken: authToken
        }
    }
})

module.exports = app
