const generateId = (name) => (
    `${name}_ ${(new Date()).getTime()}_${parseInt(Math.random() * 100000)}`
)

export default generateId