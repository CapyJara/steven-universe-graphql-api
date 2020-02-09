const { GraphQLList, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = require('graphql');
const Character = require('../models/Character');
const Chef = require('../models/Chef');
const Dish = require('../models/Dish');
const CharacterType = require('./CharacterType');
const ChefType = require('./ChefType');
const DishType = require('./DishType');

const QueryRootType = new GraphQLObjectType ({
  name: 'AppSchema',
  description: 'Application Schema Query Root',
  fields: () => ({
    chefs: {
      type: new GraphQLList(ChefType),
      description: 'List of all Chefs',
      resolve: async function() {
        return await Chef.find({});
      }
    },
    chef: {
      type: ChefType,
      description: 'Find Chef by ID',
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Chef.findById(args.id);
      }
    },
    dishes: {
      type: new GraphQLList(DishType),
      description: 'List of all dishes, filter with args',
      args: {
        name: { type: GraphQLString },
        country: { type: GraphQLString },
        tasty: { type: GraphQLBoolean },
        chefsId: { type: GraphQLID },
      },
      resolve: async function(parent, args) {
        var posts = await Dish.find(args);
        return posts;
      }
    },
    dish: {
      type: DishType,
      description: 'Find Dish by ID',
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Dish.findById(args.id);
      }
    },
    characters: {
      type: new GraphQLList(CharacterType),
      description: 'List all characters',
      args: {
        gem_type: { type: GraphQLString },
        species: { type: GraphQLString },
        gemstone: { type: GraphQLString },
        affiliations: { type: GraphQLString },
        alignment: { type: GraphQLString },
        sex: { type: GraphQLString },
        gender_pronoun: { type: GraphQLString },
        name: { type: GraphQLString },
      },
      resolve: async function(parent, args) {
        return await Character.find(args);
      }
    },
    character: {
      type: CharacterType,
      description: 'Gets character by id',
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Character.findById(args.id);
      }
    },
  })
});

module.exports = QueryRootType;
