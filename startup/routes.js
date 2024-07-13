const express = require('express');
const cors = require('cors');
const userRouter = require('../routes/user.routes');
const roleRouter = require('../routes/role.routes');
const userSessionRouter = require('../routes/userSession.routes');
const errorMiddleware = require('../middlewares/error');
const signIn = require('../models/auth').signIn;
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const sessionStore = new MySQLStore({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'template_api',
  expiration: 1000, // 1 day (in milliseconds)
  createDatabaseTable: true, // Automatically create session table if not exists
  schema: {
    tableName: 'user_session',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
});

module.exports = function(app) {
    app.use(session({
        secret: 'toulienbriek',  // Change this to a random value
        resave: true,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
          secure: false,  // Set this to true if using HTTPS
          maxAge: 1000  // 1 day (in milliseconds)
        }
    }));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use('/signup', userRouter);
    app.use('/users', userRouter);
    app.use('/roles', roleRouter);
    app.use('/sessions', userSessionRouter);
    app.post('/signin', (req, res) => {signIn(req, res)});
    // app.use(errorMiddleware);
}