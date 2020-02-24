const { ApolloServer, PubSub } = require('apollo-server');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// const pubSub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect: (connectionParams, webSocket) => {
      console.log('[server]: welcome new user');
      return { status: 'online' };
    },
    onDisconnect: (connectionParams, webSocket, context) => {
      console.log('[server]: Goodbye friend!');
    }
  }
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready on ${url}`);
  console.log(`Websockets ready on ${subscriptionsUrl}`);
});
