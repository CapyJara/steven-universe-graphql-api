const { GraphQLSchema } = require('graphql');
const QueryRootType = require('./queries/index');

const AppSchema = new GraphQLSchema({
  query: QueryRootType,
});

module.exports = AppSchema;
