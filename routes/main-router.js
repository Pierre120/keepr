// Import routers
const express = require('express');
const regRouter = require('./register-router.js');
const searchRouter = require('./search-router.js');
const dashboardRouter = require('./dashboard-router.js');
const historyRouter = require('./history-router.js');
const workspaceDeleteRouter = require('./delete-router.js');
const homeRouter = require('./home-router.js');
const logRouter = require('./loginlogout-router.js');
const userRouter = require('./user-router.js');
const inventoryRouter = require('./inventory-router.js');
const collaboratorsRouter = require('./collaborators-router.js');
const itemRouter = require('./item-router.js');
const aboutusRouter = require('./aboutus-router.js');

// Main router
let router = express.Router();


const initRoutes = (app) => {

  // Routing on main path
  app.use('/', logRouter);
  app.use('/register', regRouter); // Register Page
  app.use('/app', homeRouter); // App or Home Page
  app.use('/user', userRouter); // User/Account Page
  app.use('/', searchRouter); // For Item search Page
  app.use('/', dashboardRouter); // Dashboard
  app.use('/', inventoryRouter); // Workspace Inventory Page
  app.use('/', collaboratorsRouter); // For Collaborators Page
  app.use('/', historyRouter); // History page
  app.use('/', workspaceDeleteRouter); // For deleting workspaces
  app.use('/', itemRouter); // Item Page
  app.use('/', aboutusRouter); // About Us Page
};

// Exports the function for the app.js to use
module.exports = initRoutes;
