const express = require('express');
const registerController = require('../controllers/register-controller.js');
const authMW = require('../middlewares/authentication.js');
const router = express.Router();

router.get('/', authMW.isNotLoggedIn, registerController.viewRegisterPage);
router.post('/', authMW.isNotLoggedIn, registerController.createNewUser);

module.exports = router;
