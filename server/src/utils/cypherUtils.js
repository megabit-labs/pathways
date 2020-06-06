const createMatchParams = (params, index=null) => {
    let newParams = {}
    let result = '{'
    Object.keys(params).forEach((key) => {
        const newKey = `${key}${index === null ? '' : index}`
        result += `${key}: $${newKey}, `
        newParams[newKey] = params[key]
    })
    result = result.slice(0, result.length - 2)
    result += '}'
    return {
        queryString: result,
        params: newParams
    }
}

// const a = createMatchParams({
//     name: "Dushyant",
//     age: 19
// }, 'lol')

// console.log(a.queryString)
// console.log(a.params)

module.exports = {
    createMatchParams
}