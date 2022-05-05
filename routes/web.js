// Imports
const express = require('express');

// --- ITEM SAMPLE DATA ---
const sampleData = [
  {
    productCode: 'SCHCKE3434',
    itemName: 'Super Cheesecake',                                                                                       
    description: 'This is a traditional 9" Cheesecake, sides completely surrounded by our famous Graham Cracker Crust.',
    qty: '0 slices',
    assignedPeople: ['@bohx_airon','@bohx_faith'],
    path: '/workspace/SCHCKE3434'
  },
  {
    productCode: 'CCHCKE0909',
    itemName: 'Cheesey Cheesecake',
    description: "Make your cheesecake cheesier with Cheesy Cheesecake. Topped with 7 types of cheese which includes mozzarella, cheddar, blue cheese, parmesan, feta cheese, brie and cream cheese.",
    qty: '1 whole',
    assignedPeople: ['@bohx_pierre'],
    path: '/workspace/CCHCKE0909'
  },
  {
    productCode: 'JCHCKE7070',
    itemName: 'Jojo Cheesecake',
    description: "Cheesecake's design is inspired from the anime 'JoJo's Bizarre Adventure'.",
    qty: '2 whole',
    assignedPeople: ['@bohx_airon','@bohx_pierre'],
    path: '/workspace/JCHCKE7070'
  },
  {
    productCode: 'UCHCKE1212',
    itemName: 'Ube Cheesecake',
    description: "Make your cheesecake more ube-licious with a mix of a Filipino delicacy, ube.",
    qty: '2 whole',
    assignedPeople: ['@bohx_airon','@bohx_faith','@bohx_pierre'],
    path: '/workspace/UCHCKE1212'
  },
  {
    productCode: 'HCHCKE7878',
    itemName: 'Halo-halo Cheesecake',
    description: "Halo-halo Cheesecake is the offspring of two well-known desserts, the halo-halo and cheesecake.",
    qty: '3 slices',
    assignedPeople: ['@bohx_faith','@bohx_pierre'],
    path: '/workspace/HCHCKE7878'
  }
];

const sampleOtherUsers = [
  {
    username: 'bohx_faith',
    displayName: 'FaithGanda'
  },
  {
    username: 'bohx_airon',
    displayName: 'AironPogi'
  },
  {
    username: 'bohx_pierre',
    displayName: 'P13rr3'
  },
  {
    username: 'Giorgio_Giovanna',
    displayName: 'JoJo'
  },
  {
    username: 'mamma_mia',
    displayName: 'DancingQueen'
  }
];

const sampleWorkspaces = {
  default: 'Default Workspace',
  shoppee: 'Shoppee',
  lozoda: 'Lozoda',
  lolamove: 'Lolamove',
  tsubibo: 'Tsubibo'
}
// --- END SAMPLE DATA ---

let router = express.Router();

let initRoutes = (app) => {
  router.get('/', (req, res) => {
    return res.render('index');
  }); // Landing page

  router.get('/register', (req,res) =>{
    return res.render('register-contents', { layout: './layouts/register' })
  });// Register page

  router.get('/app', (req, res) => {
      return res.render('home', {layout: './layouts/home_layout'})
  }); // App/Home page

  router.get('/workspace/dashboard', (req, res) => {
    return res.render('dashboard', { active: 0, layout: './layouts/workspace' })
  }); // dashboard

  router.get('/workspace/inventory', (req, res) => {
    return res.render('inventory', { 
      active: 1,
      layout: './layouts/workspace',
      sampleItems: sampleData
    });
  }); // inventory

  router.get('/workspace/collaborators', (req, res) => {
    return res.render('collaborators', { active: 2, layout: './layouts/workspace' })
  }); // collaborators

  router.get('/workspace/history', (req, res) => {
    return res.render('history', { active: 3, layout: './layouts/workspace' })
  }); // history


  // --- ITEMS PAGE ---
  router.get('/workspace/SCHCKE3434', (req, res) => {
    return res.render('item', {
      layout: './layouts/item-page',
      backLink: '/workspace/inventory',
      title: sampleData[0].itemName,
      sampleItem: sampleData[0]
    });
  });

  router.get('/workspace/CCHCKE0909', (req, res) => {
    return res.render('item', {
      layout: './layouts/item-page',
      backLink: '/workspace/inventory',
      title: sampleData[1].itemName,
      sampleItem: sampleData[1]
    });
  });

  router.get('/workspace/JCHCKE7070', (req, res) => {
    return res.render('item', {
      layout: './layouts/item-page',
      backLink: '/workspace/inventory',
      title: sampleData[2].itemName,
      sampleItem: sampleData[2]
    });
  });

  router.get('/workspace/UCHCKE1212', (req, res) => {
    return res.render('item', {
      layout: './layouts/item-page',
      backLink: '/workspace/inventory',
      title: sampleData[3].itemName,
      sampleItem: sampleData[3]
    });
  });

  router.get('/workspace/HCHCKE7878', (req, res) => {
    return res.render('item', {
      layout: './layouts/item-page',
      backLink: '/workspace/inventory',
      title: sampleData[4].itemName,
      sampleItem: sampleData[4]
    });
  });

  // --- END ITEMS PAGE ---

  // --- ACCOUNTS PAGE ---
  router.get('/accounts/personal', (req, res) => {
    return res.render('account', {
      layout: './layouts/account-page',
      backLink: '/workspace/dashboard',
      username: 'JuanDelaCruz_96',
      displayName: 'St4rL0rd96'
    });
  });

  router.get('/accounts/bohxfaith', (req, res) => {
    return res.render('others-account', { 
      layout: './layouts/account-page',
      backLink: '/workspace/collaborators',
      username: sampleOtherUsers[0].username,
      displayName: sampleOtherUsers[0].displayName
    });
  });

  router.get('/accounts/bohxairon', (req, res) => {
    return res.render('others-account', { 
      layout: './layouts/account-page',
      backLink: '/workspace/collaborators',
      username: sampleOtherUsers[1].username,
      displayName: sampleOtherUsers[1].displayName
    });
  });

  router.get('/accounts/bohxpierre', (req, res) => {
    return res.render('others-account', { 
      layout: './layouts/account-page',
      backLink: '/workspace/collaborators',
      username: sampleOtherUsers[2].username,
      displayName: sampleOtherUsers[2].displayName
    });
  });

  router.get('/accounts/jojo', (req, res) => {
    return res.render('others-account', { 
      layout: './layouts/account-page',
      backLink: '/workspace/collaborators',
      username: sampleOtherUsers[3].username,
      displayName: sampleOtherUsers[3].displayName
    });
  });

  router.get('/accounts/mammamia', (req, res) => {
    return res.render('others-account', { 
      layout: './layouts/account-page',
      backLink: '/workspace/collaborators',
      username: sampleOtherUsers[4].username,
      displayName: sampleOtherUsers[4].displayName
    });
  });

  // --- END ACCOUNTS PAGE ---

  router.get('/search-results/query', (req, res) => {
    return res.render('search-results', {
      layout: './layouts/results-page',
      sampleItems: sampleData
    });
  });

  return app.use('/', router); // Set the router
};

// Exports the function for the app.js to use
module.exports = initRoutes;