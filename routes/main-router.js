// Imports
const express = require('express');
const tempRouter = require('./web.js');
const regRouter = require('./register-router.js');
const dashboardRouter = require('./dashboard-router.js');
const logRouter = require('./loginlogout-router.js');
const userRouter = require('./user-router.js');

// Main router
let router = express.Router();


const initRoutes = (app) => {

  // Routing on main path
  app.use('/', logRouter);
  // app.use('/', tempRouter); // use web.js as a temporary router
  app.use('/register', regRouter); // Register Page
  app.use('/:workspace/dashboard', dashboardRouter);
  app.use('/user', userRouter); // User/Account Page
};

// Exports the function for the app.js to use
module.exports = initRoutes;
