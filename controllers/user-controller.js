const User = require('../models/User.js');
const Collaborator = require('../models/Collaborator.js');
const Workspace = require('../models/Workspace.js');
const Item = require('../models/Item.js');
const History = require('../models/History.js');

// For viewing the account page of a user
const viewAccountPage = async (req, res) => {
  // retrieve user info to be viewed
  const viewUser = await User.findById(req.params.userId);
  
  // determine if the owner is viewing his/her account page
  const isOwner = (req.session.user.equals(viewUser._id)) ? true : false;

  // For checking
  console.log(`=== Requesting user: ${req.session.user}`);
  console.log(`=== User being viewed: ${viewUser._id}`);
  console.log(`=== Is requesting user the owner? ${isOwner}`);

  // Render the account page of the user being viewed
  res.status(200).render('account', {
    layout: './layouts/account-page',
    searchDisabled: true,
    user: viewUser,
    isInWorkspace: false,
    deleteType: 'account',
    hasEditModal: true,
    isOwner: isOwner,
    userId: req.session.user
  });
}

const updateUserInfo = async (req, res) => {
  try {
    // Retrive record of requesting user
    const user = await User.findById(req.session.user);
    console.log(res)
  
    // Check if user exist and the 
    // requesting user is the same user being edited
    if(!user || user.username !== req.body.owner) {
      // Redirect back to the account page of the user
      console.log('=== Bad Request for User edit');
      return res.status(400).redirect('/user/' + req.params.userId);
    }
  
    // Apply edits or updates
    user[req.body.property] = req.body[req.body.property];
    console.log(`=== User property being updated: ${req.body.property}`);
    await user.save(); // save the changes
    console.log(`=== Updated user: ${user}`);

    if(req.body.property === 'displayName') {
      console.log(`=== Updating collaborator info of this user`);
      const collabs = await Collaborator.find({viewId: user._id});
      for(let collab of collabs) {
        collab.displayName = user.displayName;
        await collab.save();
      }
      console.log(`=== Successfully updated collab info of this user`);
    }

    res.status(200).redirect('/user/' + req.params.userId);
  } catch (err) {
    // Error encountered
    console.log(err);
    res.status(500).redirect('/user/' + req.params.userId);
  }
}

const deleteUser = async (req, res) => {
  try {
    // Delete all items, collaborators and 
    // history of all this current user's workspaces
    const workspaces = await Workspace.find({owner: req.params.userId});
    console.log(`=== Deleting all the workspaces of this current user`);
    for(let ws of workspaces) {
      // Delete items
      for(let item of ws.inventory) {
        await Item.findByIdAndDelete(item);
      }
      // Delete collaborators
      for(let collab of ws.collaborators) {
        await Collaborator.findByIdAndDelete(collab);
      }
      // Delete history
      for(let record of ws.history) {
        await History.findByIdAndDelete(record);
      }
      // Delete personal workspace
      await Workspace.findByIdAndDelete(ws._id);
    }

    // Delete all the collabs of this user from other workspaces
    const collabs = await Collaborator.find({viewId: req.params.userId});
    // Get collab records of this user
    for(let cb of collabs) {
      // Retrieve the workspace where this use is a collaborator
      let work = await Workspace.findById(cb.workspace);
      // Remove the collaborator record from the workspace
      for(let i = 0; i < work.collaborators.length; ++i) {
        if(cb._id.equals(work.collaborators[i]._id)) {
          work.collaborators.splice(i, 1);
          await work.save();
          break;
        }
      }
      // Delete the collaborator record
      await Collaborator.findByIdAndDelete(cb._id);
    }

    console.log(`=== Deleteing user [ ${req.params.userId} ] ...`)
    // Delete the user document
    await User.findByIdAndDelete(req.params.userId);

    // Delete the session of the user
    req.session.destroy((err) => {
      if(err) { return console.log(err); }
      console.log('=== User document is deleted and session is terminated');
      res.status(200).redirect('/');
    });
  } catch (err) {
    // Error encountered
    console.log(err);
    res.status(500).redirect('/user/' + req.params.userId);
  }
}


module.exports = {
  viewAccountPage: viewAccountPage,
  updateUserInfo: updateUserInfo,
  deleteUser: deleteUser
}
