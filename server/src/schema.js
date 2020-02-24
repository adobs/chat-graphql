const { gql } = require('apollo-server');

// Field names should use camelCase. Many GraphQL clients are written in JavaScript, Java, Kotlin, or Swift, all of which recommend camelCase for variable names.
// Type names should use PascalCase. This matches how classes are defined in the languages mentioned above.
// Enum names should use PascalCase.
// Enum values should use ALL_CAPS, because they are similar to constants.

const typeDefs = gql`
  type User {
    id: ID!
    createdAt: String!
    name: String!
  }
  input ChatInput {
    createdAt: String
    from: String!
    message: String!
  }
  type Chat {
    id: ID!
    createdAt: String
    from: String!
    message: String!
  }

  type Query {
    chats: [Chat!]!
  }

  type Mutation {
    sendMessage(from: String!, message: String!, createdAt: String!): Chat!
  }

  type Subscription {
    messageSent: Chat
    chatSubscription: Chat
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;

module.exports = typeDefs;
