const express = require('express');
const authMW = require('../middlewares/authentication.js');
const deleteController = require('../controllers/delete-controller.js');
const router = express.Router();

router.post('/:workspace/:page/delete', authMW.isLoggedIn, deleteController.deleteWorkspace);

module.exports = router;
