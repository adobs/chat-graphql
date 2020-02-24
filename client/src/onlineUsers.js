import React from 'react';
import { withApollo } from '@apollo/react-hoc';

const OnlineUsers = () => {
  const [connecting, setConnecting] = React.useState(false);
  React.useEffect(() => {});

  if (connecting) {
    return <b>connecting...</b>;
  } else {
    return <b>Nobody is online</b>;
  }
};

export default OnlineUsers;
