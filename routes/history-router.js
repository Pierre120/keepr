const express = require('express');
const historyController = require('../controllers/history-controller.js');
const authMW = require('../middlewares/authentication.js');
const router = express.Router();

router.get('/:workspace/history', authMW.isLoggedIn, historyController.viewHistoryPage);
router.post('/:workspace/history/delete-history', authMW.isLoggedIn, historyController.clearHistory);
router.post('/:workspace/history', authMW.isLoggedIn, historyController.sortHistory)


module.exports = router;