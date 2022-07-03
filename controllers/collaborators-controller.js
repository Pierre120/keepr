const Workspace = require('../models/Workspace.js');
const Collaborator = require('../models/Collaborator.js');
const Item = require('../models/Item.js');
const User = require('../models/User.js');

// For getting the Collaborators page
const viewCollaboratorsPage = async (req, res) => {
  // Get current Workspace
  const currWorkspace = await Workspace.findById(req.params.workspace).populate('inventory'); 
  // Current user is owner of workspace
  const isOwner = (req.session.user.equals(currWorkspace.owner)) ? true : false;

  let collaborators = [];
  for(let userId of currWorkspace.collaborators) {
    collaborators.push(await Collaborator.findById(userId));
  }
  console.log('=== In Collaborators Page');
  console.log(collaborators);
  res.status(200).render('collaborators', {
    active: 2,
    layout: './layouts/workspace-page',
    isInWorkspace: true,
    deleteType: 'collaborator',
    hasAddModal: true,
    hasEditModal: false,
    hasSortModal: false,
    isOwner: isOwner,
    workspace: currWorkspace,
    collaborators: collaborators
  });
};

// For adding new collaborator
const addCollaborator = async (req, res) => {  

  try {
    console.log('=== In Adding collaborator');
    console.log('=======req.body.username' + req.body.username);
    // Get username of collaborator added
    const user = await User.findOneByUsername(req.body.username);
    console.log(`=== User under with username, ${req.body.username}, ${user._id}`);
    // Get current Workspace
    const currWorkspace = await Workspace.findById(req.params.workspace);
    console.log(`=== Collaborator to be added in ${currWorkspace.name}, (${currWorkspace._id})`);
    if (user != null) {
      // Checking for exisiting collaborator in workspace
      const collaboratorInWorkspace = await Collaborator.find({
        workspace: currWorkspace._id, 
        viewId: user._id
      });
      console.log(`=== List of similar collaborators: ${collaboratorInWorkspace}`);
      // Current user is owner of workspace
      const isOwner = (req.session.user.equals(user._id)) ? true : false;
      if(collaboratorInWorkspace.length > 0 || isOwner) {
        console.log('=== Invalid Collaborator.');
        return res.status(400).redirect('/' + req.params.workspace + '/collaborators');
      }
      // Create Collaborator object
      const newCollaborator = new Collaborator({
          displayName: user.displayName,
          workspace: currWorkspace._id,
          assignedItems: [],
          viewId: user._id
      });
  
      console.log(`=== Collaborator to be added: ${newCollaborator}`);
  
      // Store newCollaborator
      await newCollaborator.save();
      console.log(`=== Saved new collaborator in collaborator collection: ${newCollaborator}`);

      // Add the item to workspace
      currWorkspace.collaborators.push(newCollaborator._id);
      // Save changes in workspace
      await currWorkspace.save();
      console.log('Saved new collaborator in current workspace.');
    }

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
    const collaborator = await User.findOneByUsername(req.body.username);
    // Empty assigned items of a collaborator
    collaborator.assignedItems = [];
    let item;
    for(let itemId of req.body.assignedItems) {
      collaborator.assignedItems.push(itemId);
      await collaborator.assignedItems.save();
      item = Item.findOneByProductCode(itemId);
      item.assignedCollabs.push(collaborator._id)
      await item.assignedCollabs.save();
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
    console.log(`=== In deleting collaborator`);
    // Get current Workspace
    const currWorkspace = await Workspace.findById(req.params.workspace);
    console.log(`=== Delete collaborator in ${currWorkspace.name} (${currWorkspace._id})`);
    console.log(`=== Entered dispName of collaborator to be deleted: ${req.params.collaborator}`)
    for (let i = 0; i < currWorkspace.collaborators.length; ++i) {
      let collaborator = await Collaborator.findById(currWorkspace.collaborators[i]);
      if (collaborator.displayName == req.params.collaborator) {
        console.log(`=== Collaborator to be deleted: ${collaborator}`);
        console.log(`=== Collaborators in workspace before delete: ${currWorkspace.collaborators}`);
        // Delete item in workspace inventory
	      currWorkspace.collaborators.splice(i, 1);
        console.log(`=== Collaborators in workspace after delete: ${currWorkspace.collaborators}`);
        // Save changes in currWorkspace
        await currWorkspace.save(); 
        console.log('=== Removed collaborator from workspace');
        // Delete the collaborator document
        await Collaborator.findByIdAndDelete(collaborator._id);
        console.log('=== Removed collaborator from collaborators collection');
        break;
      }
    }

    res.status(200).redirect('/' + req.params.workspace + '/collaborators');
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
    deleteCollaborator: deleteCollaborator
}