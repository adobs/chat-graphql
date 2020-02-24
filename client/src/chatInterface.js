import React from 'react';

import { useAuth } from './useAuth';
import Chat from './chat';
import MessageBox from './messageBox';
import OnlineUsers from './onlineUsers';

const ChatInterface = props => {
  const { user } = props;
  const auth = useAuth();
  return (
    <>
      <Chat />
      <MessageBox from={user} />
      <OnlineUsers />
    </>
  );
};

export default ChatInterface;
