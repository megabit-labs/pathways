const app = require('./app')
const config = require('../config')
const github = require('./utils/github')

// app.listen(config.PORT).then(({ url }) => {
//     console.log(`GraphQL API ready at ${url}`);
// });

github.gitCommit()
