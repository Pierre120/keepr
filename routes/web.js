// Imports
const express = require('express');

let router = express.Router();

let initRoutes = (app) => {
  router.get('/', (req, res) => {
    return res.render('index');
  }); // Landing page

  router.get('/register'); // Register page

  router.get('/app'); // App/Home page

  router.get('/workspace/dashboard', (req, res) => {
    return res.render('dashboard', { ind: 0, layout: './layouts/workspace' })
  }); // dashboard

  router.get('/workspace/inventory', (req, res) => {
    return res.render('index', { ind: 1, layout: './layouts/workspace' })
  }); // inventory

  router.get('/workspace/collaborators', (req, res) => {
    return res.render('dashboard', { ind: 2, layout: './layouts/workspace' })
  }); // collaborators

  router.get('/workspace/history', (req, res) => {
    return res.render('index', { ind: 3, layout: './layouts/workspace' })
  }); // history

  return app.use('/', router); // Set the router
};

// Exports the function for the app.js to use
module.exports = initRoutes;