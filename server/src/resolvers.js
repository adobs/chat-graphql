const { PubSub } = require('apollo-server');

const ps = new PubSub();

const chats = [];
const CHAT_CHANNEL = 'CHAT_CHANNEL';
const CHAT_ADDED = 'CHAT_ADDED';

const resolvers = {
  Query: {
    chats(obj, args, context) {
      console.log({ obj, args, context });
      return chats;
    }
  },

  Mutation: {
    sendMessage(obj, { from, message, createdAt }) {
      const chat = { id: chats.length + 1, from, message, createdAt };
      chats.push(chat);
      ps.publish('CHAT_CHANNEL', { messageSent: chat });

      return chat;
    }
  },

  // Next, we make use of the publish() from the pubsub object, which accepts two arguments:
  // the channel (CHAT_CHANNEL) to publish to and an object containing the event
  // (messageSent, which must match the name of our subscription) to be fired and
  // the data (in this case the new message) to pass along with it.
  Subscription: {
    messageSent: {
      subscribe: (obj, args) => {
        console.log(obj, args);
        console.log('messageSent');
        return ps.asyncIterator(CHAT_CHANNEL, { args, obj });
      }
    },
    chatSubscription: {
      subscribe: async () => {
        console.log('NotifiyNewChats');
        return ps.asyncIterator([CHAT_ADDED]);
      }
    }
  }
};

module.exports = resolvers;
