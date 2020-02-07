var { GraphQLNonNull, GraphQLString } = require('graphql');
var ChefType = require('../queries/ChefType');
var Chef = require('../models/Chef');

const addChef = {
  type: ChefType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    rating: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async function(root, params) {
    const uModel = new Chef(params);
    const newChef = await uModel.save();
    if(!newChef) {
      throw new Error('Error');
    }
    return newChef;
  }
};

// const updateAuthor = {
//   type: AuthorType,
//   args: {
//     _id: {
//       name: '_id',
//       type: new GraphQLNonNull(GraphQLString)
//     },
//     name: {
//       name: 'name',
//       type: GraphQLString
//     },
//     email: {
//       name: 'email',
//       type: GraphQLString
//     }
//   },
//   resolve: async function(root, param) {
//     let updateAuthor = {};
//     if(param.name) {
//       updateAuthor.name = param.name;
//     }
//     if(param.email) {
//       updateAuthor.email = param.email;
//     }
//     const uAuthor = await Author.findByIdAndUpdate(param._id, updateAuthor, { new: true });
//     console.log(uAuthor);
//     if(!uAuthor) {
//       throw new Error('Error');
//     }
//     return uAuthor;
//   }
// };

// const deleteAuthor = {
//   type: AuthorType,
//   args: {
//     _id: {
//       name: '_id',
//       type: new GraphQLNonNull(GraphQLString)
//     }
//   },
//   resolve: async function(root, param) {
//     const deleteAuthor =  await Author.findByIdAndRemove(param._id);
//     if(!deleteAuthor) {
//       throw new Error('Error');
//     }
//     return deleteAuthor;
//   }
// };

module.exports = { addChef };
