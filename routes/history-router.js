const express = require('express');
const registerController = require('../controllers/history-controller.js');
const router = express.Router();

router.get('/', historyController.viewHistoryPage);
router.post('/clear', historyController.clearHistory);
router.post('/sort-history', historyController.sortHistory)


module.exports = router;