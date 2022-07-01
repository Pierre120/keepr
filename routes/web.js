// Imports
const express = require('express');
const authMW = require('../middlewares/authentication.js');

// --- ITEM SAMPLE DATA ---
const sampleData = [
  {
    pcode: 'SCHCKE3434',
    itemName: 'Super Cheesecake',                                                                                       
    description: 'This is a traditional 9" Cheesecake, sides completely surrounded by our famous Graham Cracker Crust.',
    qtyUnit: '0 slices',
    assignedCollabs: ['@bohx_airon','@bohx_faith']
  },
  {
    pcode: 'CCHCKE0909',
    itemName: 'Cheesey Cheesecake',
    description: "Make your cheesecake cheesier with Cheesy Cheesecake. Topped with 7 types of cheese which includes mozzarella, cheddar, blue cheese, parmesan, feta cheese, brie and cream cheese.",
    qtyUnit: '1 whole',
    assignedCollabs: ['@bohx_pierre']
  },
  {
    pcode: 'JCHCKE7070',
    itemName: 'Jojo Cheesecake',
    description: "Cheesecake's design is inspired from the anime 'JoJo's Bizarre Adventure'.",
    qtyUnit: '2 whole',
    assignedCollabs: ['@bohx_airon','@bohx_pierre']
  },
  {
    pcode: 'UCHCKE1212',
    itemName: 'Ube Cheesecake',
    description: "Make your cheesecake more ube-licious with a mix of a Filipino delicacy, ube.",
    qtyUnit: '2 whole',
    assignedCollabs: ['@bohx_airon','@bohx_faith','@bohx_pierre']
  },
  {
    pcode: 'HCHCKE7878',
    itemName: 'Halo-halo Cheesecake',
    description: "Halo-halo Cheesecake is the offspring of two well-known desserts, the halo-halo and cheesecake.",
    qtyUnit: '3 slices',
    assignedCollabs: ['@bohx_faith','@bohx_pierre']
  }
];

const itemPaths = {
  SCHCKE3434: sampleData[0],
  CCHCKE0909: sampleData[1],
  JCHCKE7070: sampleData[2],
  UCHCKE1212: sampleData[3],
  HCHCKE7878: sampleData[4]
}

const sampleOtherUsers = [
  {
    username: 'bohx_faith',
    displayName: 'FaithGanda',
    path: 'bohxfaith'
  },
  {
    username: 'bohx_airon',
    displayName: 'AironPogi',
    path: 'bohxairon'
  },
  {
    username: 'bohx_pierre',
    displayName: 'P13rr3',
    path: 'bohxpierre'
  },
  {
    username: 'Giorgio_Giovanna',
    displayName: 'JoJo',
    path: 'jojo'
  },
  {
    username: 'mamma_mia',
    displayName: 'DancingQueen',
    path: 'mammamia'
  }
];

const collabUsernames = [
  sampleOtherUsers[0].username,
  sampleOtherUsers[1].username,
  sampleOtherUsers[2].username,
  sampleOtherUsers[3].username,
  sampleOtherUsers[4].username
];

const userPaths = {
  bohxfaith: sampleOtherUsers[0],
  bohxairon: sampleOtherUsers[1],
  bohxpierre: sampleOtherUsers[2],
  jojo: sampleOtherUsers[3],
  mammamia: sampleOtherUsers[4]
};

const sampleWorkspaces = {
  default: {
    name: 'Default Workspace',
    _id: 'default'
  },
  shoppee: {
    name: 'Shoppee',
    _id: 'shoppee'
  },
  lozoda: {
    name: 'Lozoda',
    _id: 'lozoda'
  },
  lolamove: {
    name: 'Lolamove',
    _id: 'lolamove'
  },
  tsubibo: {
    name: 'Tsubibo',
    _id: 'tsubibo'
  }
};

const editItemModalIDs = [
  'editItemNameModal',
  'editItemCodeModal',
  'editItemQtyUnitModal',
  'editItemDescModal',
  'editItemCollabsModal'
];

const editAcctModalIDs = [
  'editAccountUsernameModal',
  'editAccountDisplayNameModal',
  'editAccountPasswordModal'
];

const editItemsAssignedID = [
  'editItemsAssignedModal'
];

const sortModalIDs = [
  'sortItemModal',
  'sortHistoryModal'
];

// --- END SAMPLE DATA ---

let router = express.Router();

// APP/HOME PAGE
router.get('/app', authMW.isLoggedIn, (req, res) => {
  return res.render('home', {
    layout: './layouts/home-page',
    hasAddModal: true
    // TODO: Pass the array of `Workspace` object of the current user retrieved from mongodb
    // workspace: <variable>
  });
}); // App/Home page

// --- ACCOUNTS PAGE ---
router.get('/accounts/personal', (req, res) => {
  return res.render('account', {
    layout: './layouts/account-page',
    // TODO: Pass the `user` object
    user: { 
      username: 'JuanDelaCruz_96',
      displayName: 'St4rL0rd96'
    },
    isInWorkspace: false,
    deleteType: 'account',
    hasEditModal: true,
    isOwner: true
  });
});

// This will be deprecated
router.get('/accounts/:user', (req, res) => {
  return res.render('others-account', { 
    layout: './layouts/account-page',
    isInWorkspace: '',
    deleteType:'',
    username: userPaths[req.params.user].username,
    displayName: userPaths[req.params.user].displayName,
  });
});
// --- END ACCOUNTS PAGE ---

// --- SEARCH RESULT PAGE
router.get('/search-results/query', (req, res) => {
  return res.render('search-results', {
    layout: './layouts/results-page',
    // TODO: Pass the array of `Item` objects base from the search query
    itemResults: sampleData
  });
}); // Search results page
// --- END SEARCH RESULT PAGE

// --- WORKSPACE PAGES ---
// DASHBOARD PAGE
router.get('/:workspace/dashboard', (req, res) => {
  return res.render('dashboard', {
    active: 0,
    layout: './layouts/workspace-page',
    isInWorkspace: true,
    deleteType: '',
    hasAddModal: false,
    hasEditModal: false,
    hasSortModal: false,
    // TODO: Pass the `Workspace` object of the current user retrieved from mongodb
    workspace: sampleWorkspaces[req.params.workspace]
    // TODO: Pass the array of `updates`. Check the `dashboard.ejs` to see the structure.
    // updates: <variable>,
    // TODO: Pass the array of `lowStock`. 
    // NOTE: You can just directly pass the array of `Item` objects.
    // lowStock: <variable>,
    // TODO: Pass the top `Item`. Just pass the `name` property of the top `Item` object.
    // topItem: <variable>,
    // TODO: Pass the total number of items in the workspace. Just use .inventory.length.
    // totalItems: <variable>.inventory.length,
    // TODO: Pass the total number of collaborators in the workspace. Just use .inventory.length.
    // totalCollaborators: <variable>.inventory.length
  })
}); // dashboard

// INVENTORY PAGE
router.get('/:workspace/inventory', (req, res) => {
  return res.render('inventory', {
    active: 1,
    layout: './layouts/workspace-page',
    isInWorkspace: true,
    deleteType: '',
    hasAddModal: true,
    hasEditModal: false,
    hasSortModal: 'item',
    // TODO: Pass the `Workspace` object of the current user retrieved from mongodb
    workspace: sampleWorkspaces[req.params.workspace],
    // TODO: Pass the array of `Item` objects
    // NOTE: Make the current workspace's Item's `assignedCollabs` property array into an object array.
    //      Since this properties contains only the ObjectId and it will not render itself in the frontend.
    inventoryItems: sampleData
  });
}); // inventory

// COLLABORATORS PAGE
router.get('/:workspace/collaborators', (req, res) => {
  return res.render('collaborators', {
    active: 2,
    layout: './layouts/workspace-page',
    isInWorkspace: true,
    deleteType: 'collaborator',
    hasAddModal: true,
    hasEditModal: true,
    hasSortModal: false,
    // TODO: Pass the `Workspace` object of the current user retrieved from mongodb
    workspace: sampleWorkspaces[req.params.workspace]
    // TODO: Pass the array of collaborators of the current workspace.
    // NOTE: Make the current workspace's Collaborator's `assignedItems` property array into an object array.
    //      Since this properties contains only the ObjectId and it will not render itself in the frontend.
    // collaborators: <variable>
  })
}); // collaborators

// HISTORY PAGE
router.get('/:workspace/history', (req, res) => {
  return res.render('history', {
    active: 3,
    layout: './layouts/workspace-page',
    isInWorkspace: true,
    deleteType: 'history',
    hasAddModal: false,
    hasEditModal: false,
    hasSortModal: 'history',
    // TODO: Pass the `Workspace` object of the current user retrieved from mongodb
    workspace: sampleWorkspaces[req.params.workspace]
    // TODO: Pass the array of history records of the current workspace.
    // NOTE: Make the Workspace's `history` property array into an object array.
    //      Since this properties contains only the ObjectId and it will not render itself in the frontend.
    // history: <variable>

  })
}); // history
// --- WORKSPACE PAGES ---


// --- ITEMS PAGE ---
router.get('/:workspace/:itemCode', (req, res) => {
  return res.render('item', {
    layout: './layouts/item-page',
    isInWorkspace: false,
    deleteType: 'item',
    hasEditModal: true,
    // TODO: Pass the `Item` object of the current workspace retrieved from mongodb
    // NOTE: Make the Item's `assignedCollabs` property array into an object array.
    //      Since this properties contains only the ObjectId and it will not render itself in the frontend.
    item: itemPaths[req.params.itemCode]
  });
});
// --- END ITEMS PAGE ---


// Exports the function for the app.js to use
module.exports = router;