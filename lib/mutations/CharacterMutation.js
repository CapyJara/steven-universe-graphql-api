var { GraphQLNonNull, GraphQLString } = require('graphql');
var CharacterType = require('../queries/CharacterType');
var Character = require('../models/Character');

const addCharacter = {
  type: CharacterType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    rating: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async function(root, params) {
    const uModel = new Character(params);
    const newCharacter = await uModel.save();
    if(!newCharacter) {
      throw new Error('Error');
    }
    return newCharacter;
  }
};

module.exports = { addCharacter };
