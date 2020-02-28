import React from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider } from '@apollo/react-hooks';
import { Chat } from './chat';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000'
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000',
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

// would i want to make my client w/ cacheRedirects???
// import ApolloClient from 'apollo-boost';
//
// const client = new ApolloClient({
//   cacheRedirects: {
//     Query: {
//       dog: (_, { id }, { getCacheKey }) => getCacheKey({ id, __typename: 'Dog' })
//     }
//   }
// })
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

function ChatInterface({ from }) {
  return (
    <ApolloProvider client={client}>
      <Chat from={from} />
    </ApolloProvider>
  );
}

export default ChatInterface;
