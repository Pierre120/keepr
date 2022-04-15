// Imports
const express = require('express');

let router = express.Router();

let initRoutes = (app) => {
  router.get('/', (req, res) => {
    return res.render('index');
  }); // Landing page

  router.get('/register'); // Register page

  router.get('/app'); // App/Home page

  router.get('/workspace', (req, res) => {
    return res.render('dashboard', { layout: './layouts/workspace' })
  }); // workspace

  return app.use('/', router); // Set the router
};

// Exports the function for the app.js to use
module.exports = initRoutes;