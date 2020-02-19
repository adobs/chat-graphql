import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { SEND_MESSAGE_MUTATION } from './graphql';

function MessageBox({ from }) {
  const [sendMessage, chat] = useMutation(SEND_MESSAGE_MUTATION);
  console.log('chat ', chat)
  let textarea = React.createRef();

  return (
      <div>
        <form onSubmit={e => {
            e.preventDefault();
            sendMessage({ variables: { from, message: textarea.value }});
            textarea.value = ''
        }}>
            <textarea ref={ref => {textarea = ref}} />
            <button type='submit'>Send</button>
        </form>
    </div>
  );
}

export default MessageBox;
