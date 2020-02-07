
const { GraphQLString, GraphQLObjectType, GraphQLID, GraphQLFloat } = require('graphql');

const ChefType = new GraphQLObjectType({
  name: 'ChefType',
  description: 'This represents a chef',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    rating: { type: GraphQLFloat }
  })
});

module.exports = ChefType;
