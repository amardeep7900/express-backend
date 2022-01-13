const post = require('../../infra/model/schema/Post');

const resolvers = {
  Query: {
    getallposts: async () => {
      return await post.find();
    },
    getpost: async (parent, args, context, info) => {
      const { id } = args;
      return await post.findById(id);
    },
    getname: async (parent, args, context, info) => {
      const { name: name } = args;
      return await post.findOne({ name });
    },
  },
  Mutation: {
    createpost: async (parent, args, context, info) => {
      const { title, description, name } = args.post;
      const create = new post({ title, name });
      return await create.save();
    },
    Deletepost: async (parent, args, context, info) => {
      const { id } = args;
      await post.findByIdAndDelete(id);
      return "ok post deleted";
    },
    updatepost: async (parent, args, context, info) => {
      const { id } = args;
      const { title, name } = args.post;
      const update = await post.findByIdAndUpdate(
        id,
        { title,  name },
        { new: true }
      );
      return update;
    },
  },
};

module.exports = resolvers;
