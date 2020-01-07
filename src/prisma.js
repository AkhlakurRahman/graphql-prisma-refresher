import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
  secret: '3434j53kjh53k4hkjh5345k34j'
});

export default prisma;
