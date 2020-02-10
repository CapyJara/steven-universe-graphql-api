
const { GraphQLString, GraphQLObjectType, GraphQLID, GraphQLList } = require('graphql');

const EpisodeType = new GraphQLObjectType({
  name: 'EpisodeType',
  description: 'This represents a episode',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    image: { type: GraphQLString },
    season: { type: GraphQLString },
    episode: { type: GraphQLString },
    airdate: { type: new GraphQLList(GraphQLString) },
    written_and_story_boarded_by: { type: new GraphQLList(GraphQLString) },
    directed_by: { type: new GraphQLList(GraphQLString) },
    previous: { type: GraphQLString },
    next: { type: GraphQLString },
    synopsis: { type: GraphQLString },
    characters: { type: new GraphQLList(GraphQLString) },
    objects: { type: new GraphQLList(GraphQLString) },
    music: { type: new GraphQLList(GraphQLString) },
    locations: { type: new GraphQLList(GraphQLString) },
    link: { type: GraphQLString },
  })
});

module.exports = EpisodeType;
