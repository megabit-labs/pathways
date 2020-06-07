const { SchemaDirectiveVisitor } = require('apollo-server')
const { defaultFieldResolver } = require('graphql')

class AllowedForDirective extends SchemaDirectiveVisitor {

    visitFieldDefinition(field) {
        const allowedRoles = this.args.roles
        const { resolve = defaultFieldResolver } = field
        field.resolve = async function (...args) {
            const context = args[2]
            const user = context.user
            
            let authorized = false
            if (user != null) {
                if (allowedRoles.includes(user.role)) {
                    authorized = true
                }
            }

            if (!authorized) {
                throw new Error(`User needs to have one of the following permissions to access this field: ${allowedRoles.toString()}`)
            }

            const result = await resolve.apply(this, args)
            return result
        }
    }
}

module.exports = AllowedForDirective