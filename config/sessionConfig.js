const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const config = require('config');

const sessionStore = new MySQLStore({
  host: config.get('db.host'),
  port: config.get('db.port'),
  user: config.get('db.username'),
  password: config.get('db.password'),
  database: config.get('db.name'),
  clearExpired: true,
  checkExpirationInterval: 60000,
  expiration: 300000, 
  createDatabaseTable: true,
  schema: {
    tableName: 'user_session',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
});

const sessionConfig = {
  secret: 'toulienbriek',  
  resave: true,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    secure: false, 
    maxAge: 300000 
  }
};

module.exports = sessionConfig;
