const { GraphQLServer, PubSub } = require('graphql-yoga')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const pubSub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubSub }})
// const server = new GraphQLServer({ typeDefs, resolvers, context });

server.start(() => console.log('server on localhost:4000'));
