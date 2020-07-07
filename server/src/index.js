const app = require('./app')
const config = require('../config')

app.listen(config.PORT).then(({ url }) => {
    console.log(`GraphQL API ready at ${url}`);
});
