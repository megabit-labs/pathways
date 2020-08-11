const neo4j = require('neo4j-driver')
const config = require('../../config')

const { NEO4J_SEARCH_INDEX } = require('../../config')

const driver = neo4j.driver(
    config.NEO4J_CONNECTION_URI,
    neo4j.auth.basic(config.NEO4J_USER, config.NEO4J_PASSWORD)
)

// Create search index.
const session = driver.session()

const searchIndex = session.run(
    `CALL db.index.fulltext.createNodeIndex($indexName, ['Pathway', 'Content'], ['name', 'title', 'content'])`,
    { indexName: NEO4J_SEARCH_INDEX }
)

console.log(searchIndex)

module.exports = driver
