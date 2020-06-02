class Model {
    constructor(neoResult) {
        Object.keys(neoResult.properties).forEach((key) => {
            this[key] = neoResult.properties[key]
        })
    }

    static generateId = (key) => {
        return `${key}_${(new Date()).getTime()}_${parseInt(Math.random() * 10000)}`
    }
}

module.exports = Model