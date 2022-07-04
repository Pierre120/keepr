const express = require('express');
const authMW = require('../middlewares/authentication.js');
const searchController = require('../controllers/search-controller.js');

const router = express.Router();

router.get('/:workspace/search-results', authMW.isLoggedIn, searchController.getSearchResults);

module.exports = router;
