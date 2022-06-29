const express = require('express');
const deleteController = require('../controllers/delete-controller.js');
const router = express.Router();

router.post('/delete', deleteController.deleteWorkspace);

module.exports = router;
