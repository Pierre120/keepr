const express = require('express');
const authMW = require('../middlewares/authentication.js')
const aboutUsController = require('../controllers/aboutus-controller.js');

const router = express.Router();

router.get('/about-us', authMW.isNotLoggedIn, aboutUsController.viewAboutUsPage);

module.exports = router;