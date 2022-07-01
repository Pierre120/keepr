const User = require('../models/User.js');

// For viewing the account page of a user
const viewAccountPage = async (req, res) => {
  // retrieve user info to be viewed
  const viewUser = await User.findById(req.params.userId);
  
  // determine if the owner is viewing his/her account page
  const isOwner = (req.session.user.equals(viewUser._id)) ? true : false;

  // For checking
  console.log(`Requesting user: ${req.session.user}`);
  console.log(`User being viewed: ${viewUser._id}`);
  console.log(`Is requesting user the owner? ${isOwner}`);

  // Render the account page of the user being viewed
  res.status(200).render('account', {
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
    console.log(res)
  
    // Check if user exist and the 
    // requesting user is the same user being edited
    if(!user || user.username !== req.body.owner) {
      // Redirect back to the account page of the user
      console.log('Bad Request for User edit');
      return res.status(400).redirect('/user/' + req.params.userId);
    }
  
    // Apply edits or updates
    user[req.body.property] = req.body[req.body.property];
    console.log(`User property being updated: ${req.body.property}`);
    await user.save(); // save the changes
    console.log(`Updated user: ${user}`);
    res.status(200).redirect('/user/' + req.params.userId);
  } catch (err) {
    // Error encountered
    console.log(err);
    res.status(500).redirect('/user/' + req.params.userId);
  }
}

const deleteUser = async (req, res) => {
  try {
    console.log(`Deleteing user [ ${req.params.userId} ] ...`)
    // Delete the user document
    await User.findByIdAndDelete(req.params.userId);

    // Delete the session of the user
    req.session.destroy((err) => {
      if(err) { return console.log(err); }
      console.log('User document is deleted and session is terminated');
      res.status(200).redirect('/');
    });
  } catch (err) {
    // Error encountered
    console.log(err);
    res.status(500).redirect('/user/' + req.params.userId);
  }
}

const updateProfilePic = (req, res) => {

}

module.exports = {
  viewAccountPage: viewAccountPage,
  updateUserInfo: updateUserInfo,
  deleteUser: deleteUser,
  updateProfilePic: updateProfilePic
}
