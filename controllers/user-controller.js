const User = require('../models/User.js');

// For viewing the account page of a user
const viewAccountPage = async (req, res) => {
  // retrieve user info to be viewed
  const viewUser = await User.findOneByUsername(req.params.username);
  // determine if the owner is viewing his/her account page
  const isOwner = (req.session.user === viewUser._id) ? true : false;

  // Render the account page of the user being viewed
  res.render('account', {
    layout: './layouts/account-page',
    user: viewUser,
    isInWorkspace: false,
    deleteType: 'account',
    hasEditModal: true,
    isOwner: isOwner
  });
}

const updateUserInfo = async (req, res) => {
  try {
    // Retrive record of requesting user
    const user = await User.findById(req.session.user);
  
    // Check if user exist and the 
    // requesting user is the same user being edited
    if(!user || user.username !== req.body.owner) {
      // Redirect back to the account page of the user
      return res.redirect(400, '/user' + req.params.userId);
    }
  
    // Apply edits or updates
    user[req.body.property] = req.body[req.body.property];
    await user.save(); // save the changes
    res.redirect(200, '/user' + req.params.userId);
  } catch (err) {
    // Error encountered
    console.log(err);
    res.redirect(500, '/user' + req.params.userId);
  }
}

const deleteUser = (req, res) => {
  
}

const updateProfilePic = (req, res) => {

}

module.exports = {
  viewAccountPage: viewAccountPage,
  updateUserInfo: updateUserInfo,
  deleteUser: deleteUser,
  updateProfilePic: updateProfilePic
}
