import gql from 'graphql-tag';

export const CHATS_QUERY = gql`
  query ChatsQuery {
    chats {
      id
      from
      message
      createdAt
    }
  }
`;

// orderBy: createdAt_DESC, first: 20

export const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessageMutation($from: String!, $message: String!, $createdAt: String!) {
    sendMessage(from: $from, message: $message, createdAt: $createdAt) {
      id
      from
      createdAt
      message
    }
  }
`;

export const MESSAGE_SENT_SUBSCRIPTION = gql`
  subscription MessageSentSubscription {
    messageSent {
      id
      from
      createdAt
      message
    }
  }
`;
// , order_by: { created_at: desc }
// export const GET_LAST_CHAT_WITH_LIMIT = gql`
//   query ChatsQuery($limit: Int!) {
//     chats {
//       id
//       from
//       message
//     }
//   }
// `;

export const NOTIFY_NEW_CHAT = gql`
  subscription onNewChat {
    notifyNewChat {
      id
    }
  }
`;
