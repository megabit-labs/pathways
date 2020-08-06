const Query = require('../../core/Query')
const { NEO4J_SEARCH_INDEX } = require('../../../../config')

const search = ({ searchQuery }) => {
    return new Query({
        statement: `
            CALL db.index.fulltext.queryNodes($indexName, $searchQuery)
            YIELD node, score
            MATCH (node)
            RETURN node.label as typem, node.id as id, score ORDER BY score DESC
        `,
        params: { indexName: NEO4J_SEARCH_INDEX, searchQuery },
    })
}

module.exports = search
