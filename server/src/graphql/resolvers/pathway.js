const queries = require('../../db/queries/queries')
const github = require("../../utils/github")

const resolver = {
    Mutation: {
        async createUpdatePathway(_, {id, name, steps}) {
            const query = queries.pathway.createUpdatePathway({
                id, name, steps
            })

            try {
                await query.run()
                return { status: 'OK', message: null }
            } catch (e) {
                return { status: 'ERROR', message: e.toString() }
            }
        },
        async deletePathway(_, {id, steps, whole}) {
            const query = queries.pathway.deletePathway({
                id, steps, whole
            })

            try {
                await query.run()
                return { status: 'OK', message: null }
            } catch (e) {
                return { status: 'ERROR', message: e.toString() }
            }
        },
        async createUpdateContent(_, {id, title, content}) {
            const query = queries.content.createUpdateContent({
                id, title, content 
            })

            try {
                await query.run()

                let file_name = github.slugifyTitle(title)
                let commit_message = `Update content ${file_name}`
                github.githubCommit({file_name, commit_message, content, })
                return { status: 'OK', message: null}
            } catch (e) {
                return { status: 'ERROR', message: e.toString() }
            }
        },
        async forkContent(_, {id, title, content, stepId}) {
            const query = queries.content.createUpdateContent({
                id, title, content, stepId
            })

            try {
                await query.run()
                return { status: 'OK', message: null}
            } catch (e) {
                return { status: 'ERROR', message: e.toString() }
            }
        },
    }
}

module.exports = resolver
