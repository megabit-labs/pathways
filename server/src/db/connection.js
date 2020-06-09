const neo4j = require('neo4j-driver')
const config = require('../../config')

const driver = neo4j.driver(
  config.NEO4j_CONNECTION_URI,
  neo4j.auth.basic(config.NEO4J_USER, config.NEO4J_PASSWORD)
)

module.exports = driver
