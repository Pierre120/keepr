const express = require('express');
const authMW = require('../middlewares/authentication.js');
const userController = require('../controllers/user-controller.js');

const router = express.Router();

router.get('/:userId', authMW.isLoggedIn, userController.viewAccountPage);
router.post('/:userId/edit', authMW.isLoggedIn, userController.updateUserInfo);
router.post('/:userId/delete', authMW.isLoggedIn, userController.deleteUser);

module.exports = router;