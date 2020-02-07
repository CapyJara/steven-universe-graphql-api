const { GraphQLString, GraphQLObjectType, GraphQLID, GraphQLBoolean } = require('graphql');
const Chef = require('../models/Chef');
const ChefType = require('./ChefType');

const DishType = new GraphQLObjectType({
  name: 'DishType',
  description: 'This is resent dish',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    tasty: { type: GraphQLBoolean },
    country: { type: GraphQLString },
    chefsId: {
      type: ChefType,
      resolve(parent) {
        return Chef.findById(parent.chefsId);
      }
    }
  })
});

module.exports = DishType
;
