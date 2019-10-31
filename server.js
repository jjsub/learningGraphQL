const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const app = express();


// .use is how middleware are added to express applications
app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));


app.listen(4000, () => {
    console.log('Listening');
})