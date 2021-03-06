import { GraphQLServer, PubSub } from 'graphql-yoga';

import db from './db';
import Post from './resolvers/Post';
import User from './resolvers/User';
import Query from './resolvers/Query';
import Comment from './resolvers/Comment';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import prisma from './prisma';
import dotenv from 'dotenv';

dotenv.config();

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    Post,
    Comment,
    User
  },
  context: {
    db,
    pubsub,
    prisma
  }
});

server.start(() => {
  console.log('The server is up!');
});
