// Imports
const express = require('express');

let router = express.Router();

let initRoutes = (app) => {
  router.get('/', (req, res) => {
    return res.render('index');
  }); // Landing page

  router.get('/register', (req,res) =>{
    return res.render('register-contents', { layout: './layouts/register' })
  });// Register page

  router.get('/app'); // App/Home page

  router.get('/workspace/dashboard', (req, res) => {
    return res.render('dashboard', { active: 0, layout: './layouts/workspace' })
  }); // dashboard

  router.get('/workspace/inventory', (req, res) => {
    return res.render('inventory', { active: 1, layout: './layouts/workspace' })
  }); // inventory

  router.get('/workspace/collaborators', (req, res) => {
    return res.render('dashboard', { active: 2, layout: './layouts/workspace' })
  }); // collaborators

  router.get('/workspace/history', (req, res) => {
    return res.render('index', { active: 3, layout: './layouts/workspace' })
  }); // history

  router.get('/workspace/item', (req, res) => {
    return res.render('item', { layout: './layouts/item-page', backLink: '/workspace/inventory' })
  });

  router.get('/accounts/user', (req, res) => {
    return res.render('account', { layout: './layouts/account-page', backLink: '/workspace/dashboard' });
  });

  router.get('/accounts/jojo', (req, res) => {
    return res.render('others-account', { 
      layout: './layouts/account-page',
      username: 'Giorgo Giovanna',
      displayName: 'J0J0' 
    });
  });

  router.get('/search-results/query', (req, res) => {
    return res.render('search_results', { layout: './layouts/results-page' });
  });

  return app.use('/', router); // Set the router
};

// Exports the function for the app.js to use
module.exports = initRoutes;