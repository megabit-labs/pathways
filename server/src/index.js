const app = require('./app')

app.listen(3003, '0.0.0.0').then(({ url }) => {
    console.log(`GraphQL API ready at ${url}`);
});