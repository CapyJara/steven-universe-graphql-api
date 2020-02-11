const graphqlHTTP = require('express-graphql');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(cors());

var root = {
  hello: () => {
    return 'Hello world!';
  },
};

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  rootValue: root,
  schema: require('./schema'),
}));

// app.use(require('./middleware/not-found'));
// app.use(require('./middleware/error'));

module.exports = app;


