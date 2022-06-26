const express = require('express');
const registerController = require('../controllers/register-controller.js');
const router = express.Router();

router.get('/', registerController.viewRegisterPage);
router.post('/', registerController.createNewUser);

module.exports = router;
