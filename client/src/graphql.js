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

export const NOTIFY_NEW_CHAT = gql`
  subscription chatSubscription {
    chatSubscription {
      id
      from
      message
      createdAt
    }
  }
`;

export const SUBSCRIBE_TO_MORE = gql`
  subscription notifyNewChat {
    chatSubscription {
      id
      from
      message
      createdAt
    }
  }
`;
