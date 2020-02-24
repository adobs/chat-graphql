import React from 'react';
import { useSubscription, useApolloClient } from '@apollo/react-hooks';
import { CHATS_QUERY, MESSAGE_SENT_SUBSCRIPTION, NOTIFY_NEW_CHAT } from './graphql';
import { graphql } from '@apollo/react-hoc';
import { useAuth } from './useAuth';

const Chat = props => {
  console.log(props);
  // const { data, loading, error } = useSubscription(NOTIFY_NEW_CHAT);

  // const [chatData, setChatData] = React.useState({
  //   // olderChatsAvailable: props.latestChat ? true : false,
  //   lastRefresh: new Date(),
  //   error: false,
  //   chats: []
  // });

  // console.log({ data, loading, error, chats });

  React.useEffect(() => {
    // loadOlder();
  }, []); // passing an empty array means it is always called

  // React.useEffect(() => {
  //   if (props.latestChat) {
  //     setChatData(prevState => ({ ...prevState, lastRefresh: new Date() }));
  //     console.log('updated...');
  //   }
  // }, [props.latestChat]); // whereas this is called when props.latestChat changes

  if (props.data.loading) return <b>Loading...</b>;
  if (props.data.error) return `Error! ${props.data.error.message}`;
  // console.log('data ', data);
  return <b>test</b>;
};

export default graphql(CHATS_QUERY)(Chat);
