// sessionConfig.js
const session = require('express-session');

const sessionStore = require('../models').sessionStore;

module.exports = session({
  secret: 'your-secret-key',  // Change this to a random value
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    secure: false,  // Set this to true if using HTTPS
    maxAge: 120 * 1000  // 1 day (in milliseconds)
  }
});
