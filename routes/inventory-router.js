const express = require('express');
const authMW = require('../middlewares/authentication.js');
const inventoryController = require('../controllers/inventory-controller.js');
const router = express.Router();

router.get('/:workspace/inventory', authMW.isLoggedIn, inventoryController.viewInventoryPage);
router.post('/:workspace/inventory/add-item', authMW.isLoggedIn, inventoryController.addItem);
router.post('/:workspace/inventory', authMW.isLoggedIn, inventoryController.sortItems);

module.exports = router;