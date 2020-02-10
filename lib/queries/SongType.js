
const { GraphQLString, GraphQLObjectType, GraphQLID, GraphQLList } = require('graphql');

const SongType = new GraphQLObjectType({
  name: 'SongType',
  description: 'This represents a song',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    image: { type: GraphQLString },
    vocalists: { type: new GraphQLList(GraphQLString) },
    composers: { type: new GraphQLList(GraphQLString) },
    lyrics: { type: GraphQLString }
  })
});

module.exports = SongType;
