const express = require('express');
const authMW = require('../middlewares/authentication.js');
const collaboratorsController = require('../controllers/collaborators-controller.js');
const router = express.Router();

router.get('/:workspace/collaborators', authMW.isLoggedIn, collaboratorsController.viewCollaboratorsPage);
router.post('/:workspace/collaborators/add-collaborator', authMW.isLoggedIn, collaboratorsController.addCollaborator);
router.post('/:workspace/collaborators/:collaborator/delete', authMW.isLoggedIn, collaboratorsController.deleteCollaborator);

module.exports = router;