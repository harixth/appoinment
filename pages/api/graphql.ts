import { ApolloServer } from 'apollo-server-micro';
import schema from '../../lib/graphql/schemas';

const apolloServer = new ApolloServer({
  schema
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: '/api/graphql' });
