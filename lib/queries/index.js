const { GraphQLList, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = require('graphql');
const Chef = require('../models/Chef');
const Dish = require('../models/Dish');
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
        const options = {};
        Object.keys(args).forEach(i => {
          options[i] = args[i];
        });
        var posts = await  Dish.find(options);
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
  })
});

module.exports = QueryRootType;
