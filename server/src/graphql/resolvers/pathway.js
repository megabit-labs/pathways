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

                // commit changes to github in the background
                github.githubCommit({title, content, author_name: "Ishan Bhanuka", author_email: "bhanuka.ishan@gmail.com"})

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
