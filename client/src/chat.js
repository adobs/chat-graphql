import React from 'react';
import { useSubscription, useQuery } from '@apollo/react-hooks';
import {
  CHATS_QUERY,
  // MESSAGE_SENT_SUBSCRIPTION,
  SUBSCRIBE_TO_MORE,
  NOTIFY_NEW_CHAT
} from './graphql';

import { useAuth } from './useAuth';

const Chat = props => {
  const auth = useAuth();
  console.log(props);
  const sub = useSubscription(NOTIFY_NEW_CHAT);
  console.log(sub);
  // console.log('subscritpion stuff', data, loading, error);
  // if (props.data.loading) return <b>Loading...</b>;
  // if (props.data.error) return `Error! ${props.data.error.message}`;
  console.log(props);
  // console.log(data, loading, error);
  React.useEffect(() => {
    props.chatSubscription();

    // *********************
    // This is a hack
    // this isn't how it's
    // supposed to work
    //
    //********************* */
    props.startPolling(500); // this is the hack
    // ******************** */
  }, [sub]);

  if (props.loading) {
    return <b>Loading...</b>;
  } else {
    return (
      <div>
        <b>Welcome,{auth.user} </b>
        <ul>
          {props.data.chats.map((chat, i) => (
            <li key={i}>
              {chat.from === auth.user ? 'you' : auth.user} said -- <div>{chat.message}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

const ChatWithData = () => {
  const { subscribeToMore, ...result } = useQuery(CHATS_QUERY, {
    variables: { channel: 'CHAT_CHANNEL' }
  });
  return (
    <Chat
      {...result}
      chatSubscription={() =>
        subscribeToMore({
          document: SUBSCRIBE_TO_MORE,
          variables: { channel: 'CHAT_CHANNEL' },
          updateQuery: (prev, { subscriptionData }) => {
            console.log(prev, subscriptionData);
            if (!subscriptionData.data) return prev;
            const newChatItem = subscriptionData.data;
            console.log(newChatItem);
            console.log('--------======----=====');
            return Object.assign({}, prev, {
              entry: {
                comments: [newChatItem, ...prev.entry.chats]
              }
            });
          }
        })
      }
    />
  );
};

export default ChatWithData;

// export default graphql(CHATS_QUERY)(Chat);
