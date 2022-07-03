const express = require('express');
const authMW = require('../middlewares/authentication.js');
const homeController = require('../controllers/home-controller.js');
const router = express.Router();

router.get('/', authMW.isLoggedIn, homeController.viewHomePage);
router.post('/add-workspace', authMW.isLoggedIn, homeController.addWorkspace);

module.exports = router;