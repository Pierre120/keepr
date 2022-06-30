const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);

const store = new MongoDBSession({
  uri: process.env.MONGODB_URL,
  collection: 'sessions'
});

module.exports = store;
