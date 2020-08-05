const { delegateToSchema } = require('graphql-tools')

const queries = require('../../db/queries/queries')

const resolver = {
    Query: {
        async SearchPathways(_, { searchQuery }, ctx, info) {
            const query = queries.pathway.search({ searchQuery })

            let result
            try {
                result = await query.run()
            } catch (e) {
                console.log('ERRROR', e)
                throw new Error('Cannot query database')
            }

            const itemIDs = result.records.map((record) => {
                const id = record.get('id')
                return id
            })

            const pathways = await delegateToSchema({
                schema: info.schema,
                operation: 'query',
                fieldName: 'Pathway',
                context: ctx,
                info: info,
                args: {
                    filter: {
                        id_in: itemIDs,
                    },
                },
            })

            return pathways
        },
        async SearchContents(_, { searchQuery }, ctx, info) {
            const query = queries.pathway.search({ searchQuery })

            let result
            try {
                result = await query.run()
            } catch (e) {
                console.log('ERRROR', e)
                throw new Error('Cannot query database')
            }

            const itemIDs = result.records.map((record) => {
                const id = record.get('id')
                return id
            })

            const contents = await delegateToSchema({
                schema: info.schema,
                operation: 'query',
                fieldName: 'Content',
                context: ctx,
                info: info,
                args: {
                    filter: {
                        id_in: itemIDs,
                    },
                },
            })

            return contents
        },
    },
}

module.exports = resolver
