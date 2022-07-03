const express = require('express');
const dashboardController = require('../controllers/dashboard-controller.js');
const router = express.Router();

router.get('/:workspace/dashboard', dashboardController.viewDashboardPage);

module.exports = router;