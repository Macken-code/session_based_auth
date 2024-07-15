const express = require('express');
const cors = require('cors');
const userRouter = require('../routes/user.routes');
const roleRouter = require('../routes/role.routes');
const userSessionRouter = require('../routes/userSession.routes');
const signIn = require('../models/auth').signIn;
const session = require('express-session');
const sessionConfig = require('../config/sessionConfig');

module.exports = function(app) {
  app.use(session(sessionConfig));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use('/signup', userRouter);
  app.use('/users', userRouter);
  app.use('/roles', roleRouter);
  app.use('/sessions', userSessionRouter);
  app.post('/signin', (req, res) => {signIn(req, res)});
}