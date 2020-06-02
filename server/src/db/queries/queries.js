const fs = require('fs')
const path = require('path')

/*
    Recursively import all queries so that they can be accessed using
    the dot notation in the rest of the codebase. This will slow down
    the application startup time, I know. But this is gonna help with
    readability, I hope.

    Can always import using raw require statements if things go wrong
    anyway.
*/
const loadModules = (dir) => {
    const files = fs.readdirSync(dir)

    let mods = {}

    files.forEach((file) => {
        const filename = path.parse(path.basename(file)).name

        if (filename != "queries") {
            if (fs.statSync(path.join(dir, file)).isDirectory()) {
                mods[filename] = loadModules(path.join(dir, file))
            } else {
                mods[filename] = require(path.join(dir, file))
            }
        }
    })

    return mods
}

mods = loadModules(__dirname)

module.exports = mods