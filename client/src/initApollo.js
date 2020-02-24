import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';

import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
});

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

// Totally Optional... we can send the user in headers
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    // capture user here from auth
    // if (user) {
    //   headers = { ...headers, 'apollo-chat-user': user };
    // }

    return { headers };
  });

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // console.log(JSON.stringify(graphQLErrors));
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log('GraphQL error', message);
    });
  }

  if (networkError) {
    console.log('Network error', networkError);
  }
});

const link = ApolloLink.from([authLink, errorLink, terminatingLink]);

export const createApolloClient = () => {
  return new ApolloClient({
    cache,
    link
  });
};
