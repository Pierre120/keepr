const Workspace = require('../models/Workspace.js');
const Collaborator = require('../models/Collaborator.js');
const Item = require('../models/Item.js');
const User = require('../models/User.js');

// For getting the Collaborators page
const viewCollaboratorsPage = async (req, res) => {
    // Get current Workspace
    const currWorkspace = await Workspace.findById(req.params.workspace); 
    // Current user is owner of workspace
    const isOwner = (req.session.user.equals(currWorkspace.owner)) ? true : false;

    let collaborators = [];
    for(let userId of currWorkspace.collaborators) {
      collaborators.push(await Collaborator.findById(userId));
    }

    res.status(200).render('collaborators', {
      active: 2,
      layout: './layouts/workspace-page',
      isInWorkspace: true,
      deleteType: 'collaborator',
      hasAddModal: true,
      hasEditModal: true,
      hasSortModal: false,
      isOwner: isOwner,
      workspace: currWorkspace,
      collaborators: collaborators
    });
  };

// For adding new collaborator
const addItem = async (req, res) => {  

  try {
    // Get username of collaborator added
    const username = req.body.username;

    // Create Collaborator object
    const newCollaborator = new Collaborator({
        displayName: username.displayName,
        workspace: req.params.workspace,
        assignedItems: []//,
        //viewId: 
    });

    // Store newCollaborator
    await newCollaborator.save();

    // Get current Workspace
    const currWorkspace = await Workspace.findById(req.params.workspace);
    // Add the item to workspace
    currWorkspace.collaborators.push(newCollaborator._id);
    // Save changes in workspace
    await currWorkspace.save();

    res.status(200).redirect('/' + req.params.workspace + '/collaborators');
  } catch(err) {
    // For checking
    console.log(err); 
    res.status(500).redirect('/' + req.params.workspace + '/collaborators');
  }
};

// For assigning item to collaborator
const  editCollaborator = async (req, res) => {  
  try {
    // Get username of collaborator added
    const collaborator = User.findOneByUsername(req.body.username);
    // Empty assigned items of a collaborator
    collaborator.assignedItems = [];
    let item;
    for(let itemId of req.body.assignedItems) {
      collaborator.assignedItems.push(itemId);
      item = Item.findOneByProductCode(itemId);
      item.assignedCollabs.push(collaborator._id)
    }

    // Store new assigned items
    await collaborator.save();

    res.status(200).redirect('/' + req.params.workspace + '/collaborators');
  } catch(err) {
    // For checking
    console.log(err); 
    res.status(500).redirect('/' + req.params.workspace + '/collaborators');
  }
};

// For deleting collaborator
const deleteCollaborator = async (req, res) => {  
  try {
    // Get current Workspace
    const currWorkspace = await Workspace.findById(req.params.workspace);
    // Get username of collaborator added
    const collaborator = User.findOneByUsername(req.body.username);

    res.status(200).redirect('/' + req.params.workspace + '/collaborators');
  } catch (err) {
    // Error encountered
    console.log(err);
    res.status(500).redirect('/' + req.params.workspace + '/collaborators');
  }
};

// For getting collaborators
const getCollaborators = async (req, res) => {  
  try {
    // Get current Workspace
    const currWorkspace = await Workspace.findById(req.params.workspace);

    return currWorkspace.collaborators;
  } catch (err) {
    // Error encountered
    console.log(err);
    res.status(500).redirect('/' + req.params.workspace + '/collaborators');
  }
};

module.exports = {
    viewCollaboratorsPage: viewCollaboratorsPage,
    addCollaborator: addCollaborator,
    editCollaborator: editCollaborator,
    deleteCollaborator: deleteCollaborator,
    getCollaborators: getCollaborators
}