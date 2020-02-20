import React from 'react';
import { useSubscription, useQuery} from '@apollo/react-hooks';
import { CHATS_QUERY, MESSAGE_SENT_SUBSCRIPTION } from './graphql';
import { graphql } from '@apollo/react-hoc';

export function UpdateChat() {
    const { data , loading, error } = useSubscription(
        MESSAGE_SENT_SUBSCRIPTION
    );

    if (loading) return null
    if (error) return `Error! ${error.message}`;

    const { messageSent } = data;
    return (
        <div key={messageSent.id}>
            <span>{messageSent.from}</span>
            <div>{messageSent.message}</div>
        </div>
    )
}

// function Chat() {
//     const { loading, error, data } = useQuery(CHATS_QUERY);
//
//     if (loading) return 'Loading...';
//     if (error) return `Error! ${error.message}`;
//     console.log("IN CHAT QUERY")
//     return (
//         <div>
//             {data.chats.map(chat => (
//                 <div key={chat.id}>
//                     <span>{chat.from}</span>
//                     <div>{chat.message}</div>
//                 </div>
//             ))}
//         </div>
//     );
// };

function Chat({ data: { chats }, loading, error }) {
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <div>
            {chats.map(({ id, from, message }) => (
                <div key={id}>
                    <span>{from}</span>
                    <div>{message}</div>
                </div>
            ))}
        </div>
    );
}

// Create our enhancer function.
const withChatQuery = graphql(CHATS_QUERY);

// // Enhance our component.
export const ChatWithData = withChatQuery(Chat);
