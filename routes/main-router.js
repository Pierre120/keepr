// Imports
const express = require('express');
const tempRouter = require('./web.js');

// Main router
let router = express.Router();


const initRoutes = (app) => {

  // Routing on main path
  app.use('/', tempRouter); // use web.js as a temporary router

};

// Exports the function for the app.js to use
module.exports = initRoutes;