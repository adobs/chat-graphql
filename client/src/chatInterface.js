import React from 'react';

import { useAuth } from './useAuth';
import Chat from './chat';
import MessageBox from './messageBox';
// import OnlineUsers from './onlineUsers';

const ChatInterface = props => {
  const auth = useAuth();
  return (
    <>
      <Chat />
      <MessageBox />
      {/* fun future improvement? <OnlineUsers />*/}
    </>
  );
};

export default ChatInterface;
