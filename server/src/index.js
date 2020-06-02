const { ApolloServer } = require('apollo-server')
const { makeExecutableSchema } = require('apollo-server')
const { makeAugmentedSchema } = require('neo4j-graphql-js')

const driver = require('./db/connection')

const typedefs = require('./graphql/typedefs')
const resolvers = require('./graphql/resolvers')

const schema = makeAugmentedSchema({
    typeDefs: typedefs,
    resolvers: resolvers,
    config: {
        query: true,
        mutation: false
    }
})

const server = new ApolloServer({ schema, context: { driver }})

server.listen(3003, '0.0.0.0').then(({ url }) => {
    console.log(`GraphQL API ready at ${url}`);
});