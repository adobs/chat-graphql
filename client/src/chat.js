import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CHATS_QUERY, SEND_MESSAGE_MUTATION, MESSAGE_SENT_SUBSCRIPTION } from './graphql';
import { useMutation } from '@apollo/react-hooks';

export default function Chat({ from }) {
  const { loading, error, data, subscribeToMore } = useQuery(CHATS_QUERY);
  const [sendMessage, chat] = useMutation(SEND_MESSAGE_MUTATION);
  let textarea = React.createRef();

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  // Hack to get around https://github.com/apollographql/apollo-client/issues/3480
  const setData = new Set(data.chats);
  const listData = [];
  setData.forEach(item => listData.push(item));
  listData.sort((a, b) => a.id < b.id);

  subscribeToMore({
    document: MESSAGE_SENT_SUBSCRIPTION,
    variables: {
      from,
      message: textarea
    },
    updateQuery: (previousResult, { subscriptionData }) => {
      if (!subscriptionData) {
        return [...previousResult.chats];
      }
      return {
        chats: [...previousResult.chats, subscriptionData.data.messageSent]
      };
    }
  });

  return (
    <div>
      {listData.map(({ id, from, message }) => (
        <div key={id}>
          <span>{from}</span>
          <div>{message}</div>
        </div>
      ))}
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            sendMessage({ variables: { from, message: textarea.value } });
            textarea.value = '';
          }}
        >
          <textarea
            ref={ref => {
              textarea = ref;
            }}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
