const express = require('express');
const homeController = require('../controllers/home-controller.js');
const router = express.Router();

router.get('/', homeController.viewHomePage);
router.post('/addWorkspace', homeController.addWorkspace);

module.exports = router;