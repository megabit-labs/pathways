const Model = require('../core/Model')
const queries = require('../queries/queries')
const jwt = require('jsonwebtoken')

class User extends Model {
    constructor(neoResult) {
        super(neoResult)

        this.generateToken = () => {
            console.log("HERE")
            const encoded = jwt.sign({ id: this.id }, process.env.JWT_SECRET || 'lolmao12345')
            console.log("ENC", encoded)
            return encoded
        }
    }

    static schema = () => ({
        id: String,
        name: String,
        username: String,
        password: String
    })

    static findByToken = async (token) => {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'lolmao12345')
            const query = queries.user.findOne({
                id: decoded.id
            })
    
            const result = await query.run()
            const userNode = result.records[0].get(0)
            const user = new User(userNode)
            return user
        } catch (e) {
            console.log("Got unauthorized request")
            // console.log(e)
            return null
        }
    }

}

module.exports = User
