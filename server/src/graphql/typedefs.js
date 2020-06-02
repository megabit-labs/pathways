const { fileLoader, mergeTypes } = require('merge-graphql-schemas')
const { join } = require('path')
const { makeExecutableSchema } = require('apollo-server')
const { makeAugmentedSchema } = require('neo4j-graphql-js')

const typesArray = fileLoader(join(__dirname, './typedefs'))
typedefs = mergeTypes(typesArray, { all: true })

// console.log(gql`${typedefs}`)

module.exports = typedefs
