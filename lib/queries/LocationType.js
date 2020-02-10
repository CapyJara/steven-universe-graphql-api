
const { GraphQLString, GraphQLObjectType, GraphQLID, GraphQLList } = require('graphql');

const LocationType = new GraphQLObjectType({
  name: 'LocationType',
  description: 'This represents a location',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    image: { type: GraphQLString },
    type: { type: GraphQLString },
    location: { type: GraphQLString },
    first: { type: GraphQLString },
    last: { type: GraphQLString },
    inhabitants: { type: new GraphQLList(GraphQLString) },
    owner: { type: GraphQLString },
    employees: { type: new GraphQLList(GraphQLString) },
  })
});

module.exports = LocationType;
