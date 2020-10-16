const queries = require('../../db/queries/queries')
const github = require('../../utils/github')

const resolver = {
    Mutation: {
        async createUpdatePathway(
            _,
            { id, name, steps, tags, description },
            context
        ) {
            const { username } = context.user
            const query = queries.pathway.createUpdatePathway({
                id,
                name,
                steps,
                tags,
                description,
                username,
            })

            try {
                await query.run()
                return { status: 'OK', message: null }
            } catch (e) {
                return { status: 'ERROR', message: e.toString() }
            }
        },
        async deletePathway(_, { id, steps, whole }) {
            const query = queries.pathway.deletePathway({
                id,
                steps,
                whole,
            })

            try {
                await query.run()
                return { status: 'OK', message: null }
            } catch (e) {
                return { status: 'ERROR', message: e.toString() }
            }
        },
        async createUpdateContent(_, { id, title, content }, context) {
            const { username } = context.user
            const query = queries.content.createUpdateContent({
                id,
                title,
                content,
                username,
            })

            try {
                await query.run()

                // commit changes to github in the background
                // slugify id to create file name so that file name
                // remains unchanged even if title changes
                github.safeGithubCommit({
                    id,
                    content,
                    author_name: context.user.name,
                    author_email: context.user.email,
                })

                return { status: 'OK', message: null }
            } catch (e) {
                return { status: 'ERROR', message: e.toString() }
            }
        },
        async forkContent(_, { id, title, content, stepId }, context) {
            const query = queries.content.createUpdateContent({
                id,
                title,
                content,
                stepId,
            })

            try {
                await query.run()

                // create new file if content is forked
                // commit changes to github in the background
                // slugify id to create file name so that file name
                // remains unchanged even if title changes
                github.safeGithubCommit({
                    id,
                    content,
                    author_name: context.user.name,
                    author_email: context.user.email,
                })

                return { status: 'OK', message: null }
            } catch (e) {
                return { status: 'ERROR', message: e.toString() }
            }
        },
    },
}

module.exports = resolver
