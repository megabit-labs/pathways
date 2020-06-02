const driver = require('../connection')

class Query {
    constructor({ statement, params }) {
        this.statement = statement
        this.params = params
    }

    run = async () => {
        const session = driver.session()
        const result = await session.run(this.statement, this.params)
        session.close()

        return result
    }
}

module.exports = Query