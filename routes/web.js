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
    return res.render('dashboard', { layout: './layouts/workspace', active: 0 })
  }); // dashboard

  router.get('/workspace/inventory', (req, res) => {
    return res.render('index', { layout: './layouts/workspace', active: 1 })
  }); // inventory

  router.get('/workspace/collaborators', (req, res) => {
    return res.render('dashboard', { layout: './layouts/workspace', active: 2 })
  }); // collaborators

  router.get('/workspace/history', (req, res) => {
    return res.render('index', { layout: './layouts/workspace', active: 3 })
  }); // history

  return app.use('/', router); // Set the router
};

// Exports the function for the app.js to use
module.exports = initRoutes;