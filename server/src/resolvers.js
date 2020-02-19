const chats = []
const CHAT_CHANNEL = 'CHAT_CHANNEL'

const resolvers = {
      Query: {
          chats(obj, args, context) {
              return chats;
          }
      },

      Mutation: {
          sendMessage(obj, { from, message }, { pubSub }) {
              const chat = { id: chats.length + 1, from, message };
              chats.push(chat);
              pubSub.publish('CHAT_CHANNEL', { messageSent: chat })

              return chat;
          }
      },

      // Next, we make use of the publish() from the pubsub object, which accepts two arguments:
      // the channel (CHAT_CHANNEL) to publish to and an object containing the event
      // (messageSent, which must match the name of our subscription) to be fired and
      // the data (in this case the new message) to pass along with it.
      Subscription: {
          messageSent: {
              subscribe: (obj, args, { pubSub }) => {
                  return pubSub.asyncIterator(CHAT_CHANNEL);
              }
          }
      }
};

module.exports = resolvers
