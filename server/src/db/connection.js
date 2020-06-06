const neo4j = require('neo4j-driver')
const config = require('../../config')

const driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic(config.NEO4J_USER, config.NEO4J_PASSWORD)
)

module.exports = driver
