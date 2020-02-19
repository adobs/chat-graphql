import React from 'react';
import { useSubscription, useQuery} from '@apollo/react-hooks';
import { CHATS_QUERY, MESSAGE_SENT_SUBSCRIPTION } from './graphql';

export function UpdateChat() {
    const { data , loading, error } = useSubscription(
        MESSAGE_SENT_SUBSCRIPTION
    );

    if (loading) return null
    if (error) return `Error! ${error.message}`;
    console.log("data ", data)
    const { messageSent } = data;
    return (
        <div key={messageSent.id}>
            <span>{messageSent.from}</span>
            <div>{messageSent.message}</div>
        </div>
    )
}

export function Chat() {
    const { loading, error, data } = useQuery(CHATS_QUERY);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log("IN CHAT QUERY")
    return (
        <div>
            {data.chats.map(chat => (
                <div key={chat.id}>
                    <span>{chat.from}</span>
                    <div>{chat.message}</div>
                </div>
            ))}
        </div>
    );
};
