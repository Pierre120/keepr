const express = require('express');
const authMW = require('../middlewares/authentication.js')
const logController = require('../controllers/loginlogout-controller.js');

const router = express.Router();

router.get('/', authMW.isNotLoggedIn, logController.viewLoginPage);
router.post('/', authMW.isNotLoggedIn, logController.loginUser);
router.post('/logout', authMW.isLoggedIn, logController.logoutUser);

module.exports = router;
