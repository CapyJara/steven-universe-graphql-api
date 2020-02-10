
const { GraphQLString, GraphQLObjectType, GraphQLID, GraphQLList } = require('graphql');

const CharacterType = new GraphQLObjectType({
  name: 'CharacterType',
  description: 'This represents a chef',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    image: { type: GraphQLString },
    nicknames: { type: new GraphQLList(GraphQLString) },
    alias: { type: new GraphQLList(GraphQLString) },
    species: { type: new GraphQLList(GraphQLString) },
    weapons: { type: new GraphQLList(GraphQLString) },
    sex: { type: new GraphQLList(GraphQLString) },
    gender_pronoun: { type: new GraphQLList(GraphQLString) },
    hair: { type: new GraphQLList(GraphQLString) },
    eyes: { type: new GraphQLList(GraphQLString) },
    gemstone: { type: new GraphQLList(GraphQLString) },
    gem_type: { type: new GraphQLList(GraphQLString) },
    affiliations: { type: new GraphQLList(GraphQLString) },
    occupations: { type: new GraphQLList(GraphQLString) },
    alignment: { type: new GraphQLList(GraphQLString) },
    relatives: { type: new GraphQLList(GraphQLString) },
    friends: { type: new GraphQLList(GraphQLString) },
    voice_actor: { type: new GraphQLList(GraphQLString) },
    first_appearance: { type: new GraphQLList(GraphQLString) }
  })
});

module.exports = CharacterType;
