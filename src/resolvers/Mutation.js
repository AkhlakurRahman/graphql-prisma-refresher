const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: args.data.email });

    if (emailTaken) {
      throw new Error('Email taken');
    }

    return prisma.mutation.createUser({ data: args.data }, info);
  },
  async deleteUser(parent, args, { prisma }, info) {
    const userExists = await prisma.exists.User({ id: args.id });

    if (!userExists) {
      throw new Error('User does not exists');
    }

    return prisma.mutation.deleteUser(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async updateUser(parent, args, { prisma }, info) {
    const { name, email } = args.data;

    const userExists = await prisma.exists.User({ id: args.id });

    if (!userExists) {
      throw new Error('User does not exists');
    }

    return prisma.mutation.updateUser(
      { where: { id: args.id }, name, email },
      info
    );
  },
  createPost(parent, args, { prisma }, info) {
    return prisma.mutation.createPost(
      {
        data: {
          title: args.data.title,
          body: args.data.body,
          published: args.data.published,
          author: {
            connect: {
              id: args.data.author
            }
          }
        }
      },
      info
    );
  },
  async deletePost(parent, args, { prisma }, info) {
    const postExists = await prisma.exists.Post({ id: args.id });

    if (!postExists) {
      throw new Error('Post does not exists!');
    }

    return prisma.mutation.deletePost(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async updatePost(parent, args, { prisma }, info) {
    const postExists = await prisma.exists.Post({ id: args.id });

    if (!postExists) {
      throw new Error('Post does not exists!');
    }

    return prisma.mutation.updatePost(
      {
        where: {
          id: args.id
        },
        data: args.data
      },
      info
    );
  },
  createComment(parent, args, { prisma }, info) {
    return prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          author: {
            connect: {
              id: args.data.author
            }
          },
          post: {
            connect: {
              id: args.data.post
            }
          }
        }
      },
      info
    );
  },
  async deleteComment(parent, args, { prisma }, info) {
    const commentExists = await prisma.exists.Comment({ id: args.id });

    if (!commentExists) {
      throw new Error('Post does not exists!');
    }

    return prisma.mutation.deleteComment({ where: { id: args.id } }, info);
  },
  async updateComment(parent, args, { prisma }, info) {
    const commentExists = await prisma.exists.Comment({ id: args.id });

    if (!commentExists) {
      throw new Error('Post does not exists!');
    }

    return prisma.mutation.updateComment(
      {
        where: {
          id: args.id
        },
        data: args.data
      },
      info
    );
  }
};

export default Mutation;
