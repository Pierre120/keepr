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
    return res.render('dashboard', { active: 0, layout: './layouts/workspace' })
  }); // dashboard

  router.get('/workspace/inventory', (req, res) => {
    return res.render('index', { active: 1, layout: './layouts/workspace' })
  }); // inventory

  router.get('/workspace/collaborators', (req, res) => {
    return res.render('dashboard', { active: 2, layout: './layouts/workspace' })
  }); // collaborators

  router.get('/workspace/history', (req, res) => {
    return res.render('index', { active: 3, layout: './layouts/workspace' })
  }); // history

  router.get('/accounts/user', (req, res) => {
    return res.render('account', { layout: './layouts/account-page' });
  });

  return app.use('/', router); // Set the router
};

// Exports the function for the app.js to use
module.exports = initRoutes;