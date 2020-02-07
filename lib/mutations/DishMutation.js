var { GraphQLNonNull, GraphQLString, GraphQLBoolean } = require('graphql');
var Dish = require('../models/Dish');
var DishType = require('../queries/DishType');

const addDish = {
  type: DishType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: new GraphQLNonNull(GraphQLString) },
    tasty: { type: new GraphQLNonNull(GraphQLBoolean) },
    chefsId: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(parent, args) {
    let dish = new Dish({
      name: args.name,
      country: args.country,
      tasty: args.tasty,
      chefsId: args.chefsId,
    });
    return dish.save();
  }
};

// const updatePost = {
//   type: PostType,
//   args: {
//     _id: {
//       name: '_id',
//       type: new GraphQLNonNull(GraphQLString)
//     },
//     author_id: {
//       name: 'author_id',
//       type: GraphQLString
//     },
//     title: {
//       name: 'title',
//       type: GraphQLString
//     },
//     body: {
//       name: 'body',
//       type: GraphQLString
//     }
//   },
//   resolve: async function(root, param) {
//     let updatePost = {};
//     if(param.author_id) {
//       updatePost.author_id = param.author_id;
//     }

//     if(param.title) {
//       updatePost.title = param.title;
//     }

//     if(param.body) { 
//       updatePost.body = param.body;
//     }

//     const updatePostInfo = await Post.findByIdAndUpdate(param._id, updatePost, { new: true });

//     if(!updatePostInfo) {
//       throw new Error('Error');
//     }
//     return updatePostInfo;
//   }
// };

// const deletePost = {
//   type: PostType,
//   args: {
//     _id: {
//       name: '_id',
//       type: new GraphQLNonNull(GraphQLString)
//     }
//   },
//   resolve: async function(root, param) {
//     const deletePost = await Post.findByIdAndRemove(param._id);
//     if(deletePost) {
//       throw new Error('Error');
//     }
//     return deletePost;
//   }
// };

module.exports = { addDish }
;
