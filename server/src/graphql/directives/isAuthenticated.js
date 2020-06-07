const { SchemaDirectiveVisitor } = require('apollo-server')
const { defaultFieldResolver } = require('graphql')

/**
 * Defining a different directive related to authentication. This
 * directive is basically the same as the allowedFor directive
 * with all the roles allowed. However, if we want a field to be
 * available for any kind of user, I don't think we should be using
 * the allowedFor directive for that as then if a new role is 
 * introduced we'll need to add it to every allowedFor declaration.
 * 
 * So here we are.
 */
class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const originalResolve = field.resolve || defaultFieldResolver;
        field.resolve = async function (...args) {
            const context = args[2]
            const user = context.user
            
            const authorized = (user != null)

            if (!authorized) {
                throw new Error('User needs to be authorized to view this field')
            }

            const result = await originalResolve.apply(this, args)
            return result
        }
    }
}

module.exports = IsAuthenticatedDirective