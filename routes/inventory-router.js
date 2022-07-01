const express = require('express');
const inventoryController = require('../controllers/inventory-controller.js');
const router = express.Router();

router.get('/:workspace/inventory', inventoryController);
router.post('/:workspace/inventory', inventoryController);

module.exports = router;