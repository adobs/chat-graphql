import React from 'react';
import { useMutation, useSubscription } from '@apollo/react-hooks';
import { SEND_MESSAGE_MUTATION, NOTIFY_NEW_CHAT } from './graphql';
import { useAuth } from './useAuth';

function MessageBox() {
  const { user } = useAuth();
  const [sendMessage, chat] = useMutation(SEND_MESSAGE_MUTATION);
  const sub = useSubscription(NOTIFY_NEW_CHAT);
  console.log('sub ', sub, chat);
  let textarea = React.createRef();

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log({
            variables: { from: user, message: textarea.value, createdAt: new Date().toDateString() }
          });
          sendMessage({
            variables: { from: user, message: textarea.value, createdAt: new Date().toDateString() }
          });
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
  );
}

export default MessageBox;
