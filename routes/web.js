// Imports
const express = require('express');
const authMW = require('../middlewares/authentication.js');

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
    assignedPeople: ['@bohx_airon','@bohx_pierre']
  },
  {
    productCode: 'UCHCKE1212',
    itemName: 'Ube Cheesecake',
    description: "Make your cheesecake more ube-licious with a mix of a Filipino delicacy, ube.",
    qty: '2 whole',
    assignedPeople: ['@bohx_airon','@bohx_faith','@bohx_pierre']
  },
  {
    productCode: 'HCHCKE7878',
    itemName: 'Halo-halo Cheesecake',
    description: "Halo-halo Cheesecake is the offspring of two well-known desserts, the halo-halo and cheesecake.",
    qty: '3 slices',
    assignedPeople: ['@bohx_faith','@bohx_pierre']
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
    path: 'default'
  },
  shoppee: {
    name: 'Shoppee',
    path: 'shoppee'
  },
  lozoda: {
    name: 'Lozoda',
    path: 'lozoda'
  },
  lolamove: {
    name: 'Lolamove',
    path: 'lolamove'
  },
  tsubibo: {
    name: 'Tsubibo',
    path: 'tsubibo'
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

router.get('/app', authMW.isLoggedIn, (req, res) => {
  return res.render('home', {
    layout: './layouts/home-page',
    hasAddModal: true
  });
}); // App/Home page

// --- ACCOUNTS PAGE ---
router.get('/accounts/personal', (req, res) => {
  return res.render('account', {
    layout: './layouts/account-page',
    backLink: '/workspace/dashboard',
    user: {
      username: 'JuanDelaCruz_96',
      displayName: 'St4rL0rd96'
    },
    hasEditModal: true,
    index: 0,
    isItem: false,
    isAcct: true,
    isAssign: false,
    isInWorkspace: false,
    deleteType: 'account',
    isOwner: true
  });
});

router.get('/accounts/:user', (req, res) => {
  return res.render('others-account', { 
    layout: './layouts/account-page',
    backLink: '/workspace/collaborators',
    username: userPaths[req.params.user].username,
    displayName: userPaths[req.params.user].displayName,
    isItem: false,
    isAcct: false,
    isAssign: false,
    sampleItem: '',
    isInWorkspace: '',
    deleteType:''
  });
});
// --- END ACCOUNTS PAGE ---

// --- SEARCH RESULT PAGE
router.get('/search-results/query', (req, res) => {
  return res.render('search-results', {
    layout: './layouts/results-page',
    sampleItems: sampleData
  });
}); // Search results page
// --- END SEARCH RESULT PAGE

// --- WORKSPACE PAGES ---
router.get('/:workspace/dashboard', (req, res) => {
  return res.render('dashboard', {
    active: 0,
    layout: './layouts/workspace-page',
    workspace: sampleWorkspaces[req.params.workspace].name,
    workspacePath: sampleWorkspaces[req.params.workspace].path,
    hasAddModal: false,
    hasSortModal: false,
    isInWorkspace: true,
    deleteType: '',
    hasEditModal: false,
    sampleItem: itemPaths,
    index: 0,
    isItem: false,
    isAcct: false,
    isAssign: false
  })
}); // dashboard

router.get('/:workspace/inventory', (req, res) => {
  return res.render('inventory', {
    active: 1,
    layout: './layouts/workspace-page',
    workspace: sampleWorkspaces[req.params.workspace].name,
    workspacePath: sampleWorkspaces[req.params.workspace].path,
    sampleItems: sampleData,
    hasAddModal: true,
    hasSortModal: 'item',
    sortFormSubmitPath: req.path,
    isInWorkspace: true,
    deleteType: '',
    hasEditModal: false,
    sampleItem: itemPaths,
    index: 0,
    isItem: false,
    isAcct: false,
    isAssign: false
  });
}); // inventory

router.get('/:workspace/collaborators', (req, res) => {
  return res.render('collaborators', {
    active: 2,
    layout: './layouts/workspace-page',
    workspace: sampleWorkspaces[req.params.workspace].name,
    workspacePath: sampleWorkspaces[req.params.workspace].path,
    collabUnames: collabUsernames,
    index: 0,
    hasAddModal: true,
    isInWorkspace: true,
    deleteType: 'collaborator',
    hasEditModal: true,
    sampleItems: sampleData,
    index: 0,
    isItem: false,
    isAcct: false,
    isAssign: true,
    hasSortModal: false
  })
}); // collaborators

router.get('/:workspace/history', (req, res) => {
  return res.render('history', {
    active: 3,
    layout: './layouts/workspace-page',
    workspace: sampleWorkspaces[req.params.workspace].name,
    workspacePath: sampleWorkspaces[req.params.workspace].path,
    hasAddModal: false,
    hasSortModal: 'history',
    sortFormSubmitPath: req.path,
    isInWorkspace: true,
    deleteType: 'history',
    hasEditModal: false,
    sampleItem: itemPaths,
    index: 0,
    isItem: false,
    isAcct: false,
    isAssign: false
  })
}); // history
// --- WORKSPACE PAGES ---


// --- ITEMS PAGE ---
router.get('/:workspace/:itemCode', (req, res) => {
  return res.render('item', {
    layout: './layouts/item-page',
    backLink: '/workspace/inventory',
    title: itemPaths[req.params.itemCode].itemName,
    sampleItem: itemPaths[req.params.itemCode],
    hasEditModal: true,
    index: 0,
    isItem: true,
    isAcct: false,
    isAssign: false,
    isInWorkspace: false,
    deleteType: 'item'
  });
});
// --- END ITEMS PAGE ---


// Exports the function for the app.js to use
module.exports = router;