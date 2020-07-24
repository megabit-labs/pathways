const Model = require("../core/Model")
const queries = require("../queries/queries")
const jwt = require("jsonwebtoken")

class User extends Model {
    constructor(neoResult) {
        super(neoResult)
    }

    generateToken = () => {
        const encoded = jwt.sign(
            { username: this.username },
            process.env.JWT_SECRET || "lolmao12345"
        )
        return encoded
    }

    static schema = () => ({
        id: String,
        name: String,
        email: String,
        username: String,
        password: String,
    })

    static findByToken = async (token) => {
        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET || "lolmao12345"
            )
            const query = queries.user.findOne({
                username: decoded.username,
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
