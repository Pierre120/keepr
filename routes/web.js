// Imports
const express = require('express');

let router = express.Router();

let initRoutes = (app) => {
  router.get('/', (req, res) => {
    return res.send('<h1>Hello World!</h1>');
  }); // Landing page

  router.get('/register'); // Register page

  router.get('/app'); // App/Home page

  router.get('/workspace'); // workspace

  return app.use('/', router); // Set the router
};

// Exports the function for the app.js to use
module.exports = initRoutes;