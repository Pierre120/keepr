// Imports
const express = require('express');

// --- ITEM SAMPLE DATA ---
const sampleData = [
  {
    productCode: 'SCHCKE3434',
    itemName: 'Super Cheesecake',                                                                                       
    description: 'This is a traditional 9" Cheesecake, sides completely surrounded by our famous Graham Cracker Crust.',
    qty: '0 slices',
    assignedPeople: ['@bohx_airon','@bohx_faith']
  },
  {
    productCode: 'CCHCKE0909',
    itemName: 'Cheesey Cheesecake',
    description: "Make your cheesecake cheesier with Cheesy Cheesecake. Topped with 7 types of cheese which includes mozzarella, cheddar, blue cheese, parmesan, feta cheese, brie and cream cheese.",
    qty: '1 whole',
    assignedPeople: ['@bohx_pierre']
  },
  {
    productCode: 'JCHCKE7070',
    itemName: 'Jojo Cheesecake',
    description: "Cheesecake's design is inspired from the anime 'JoJo's Bizarre Adventure'.",
    qty: '2 whole',
    assignedPeople: ['@bohx_pierre']
  },
  {
    productCode: 'UCHCKE1212',
    itemName: 'Ube Cheesecake',
    description: "Make your cheesecake more ube-licious with a mix of the Filipino delicacy, ube.",
    qty: '2 whole',
    assignedPeople: ['@bohx_airon','@bohx_faith','@bohx_pierre']
  },
  {
    productCode: 'HCHCKE7878',
    itemName: 'Halo-halo Cheesecake',
    description: "Make your cheesecake cheesier with Cheesy Cheesecake. Topped with 7 types of cheese which includes mozzarella, cheddar, blue cheese, parmesan, feta cheese, brie and cream cheese.",
    qty: '3 slices',
    assignedPeople: ['@bohx_pierre']
  }
];
// --- END SAMPLE DATA ---

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
      backLink: '/workspace/collaborators',
      username: 'Giorgo Giovanna',
      displayName: 'J0J0' 
    });
  });

  router.get('/search-results/query', (req, res) => {
    return res.render('search-results', { layout: './layouts/results-page' });
  });

  return app.use('/', router); // Set the router
};

// Exports the function for the app.js to use
module.exports = initRoutes;