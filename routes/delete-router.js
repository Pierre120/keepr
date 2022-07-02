const express = require('express');
const deleteController = require('../controllers/delete-controller.js');
const router = express.Router();

router.post('/:workspace/:page/delete', deleteController.deleteWorkspace);

module.exports = router;
