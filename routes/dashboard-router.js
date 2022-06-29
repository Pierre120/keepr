const express = require('express');
const dashboardController = require('../controllers/dashboard-controller.js');
const router = express.Router();

router.get('/', dashboardController.viewDashboardPage);

module.exports = router;