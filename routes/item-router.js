const express = require('express');
const authMW = require('../middlewares/authentication.js');
const itemController = require('../controllers/item-controller.js');
const router = express.Router();

router.get('/:workspace/:pcode', authMW.isLoggedIn, itemController.viewItemPage);
router.post('/:workspace/:pcode/edit', authMW.isLoggedIn, itemController.updateItemInfo);
router.post('/:workspace/:pcode/delete', authMW.isLoggedIn, itemController.deleteItem);

module.exports = router;