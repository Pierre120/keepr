// Imports
const express = require('express');
const tempRouter = require('./web.js');
const regRouter = require('./register-router.js');
const workspaceDeleteRouter = require('./delete-router.js');

// Main router
let router = express.Router();


const initRoutes = (app) => {

  // Routing on main path
  app.use('/', tempRouter); // use web.js as a temporary router
  app.use('/register', regRouter); // Register Page
  app.use('/:workspace/delete', workspaceDeleteRouter);
};

// Exports the function for the app.js to use
module.exports = initRoutes;
