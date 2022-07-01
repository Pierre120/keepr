const express = require('express');
const authMW = require('../middlewares/authentication.js');
const userController = require('../controllers/user-controller.js');

const router = express.Router();

router.get('/:id', authMW.isLoggedIn, userController.viewAccountPage);

module.exports = router;