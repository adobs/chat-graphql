import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CHATS_QUERY, SEND_MESSAGE_MUTATION } from './graphql';
import { useMutation } from '@apollo/react-hooks';

export function Chat({ from }) {
  const { loading, error, data, fetchMore } = useQuery(CHATS_QUERY);
  const [sendMessage, chat] = useMutation(SEND_MESSAGE_MUTATION);
  let textarea = React.createRef();

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      {data.chats.map(({ id, from, message }) => (
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
            fetchMore({
              updateQuery: (previousResult, { fetchMoreResult: { chats } }) => {
                return {
                  ...previousResult,
                  chats
                };
              }
            });
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
