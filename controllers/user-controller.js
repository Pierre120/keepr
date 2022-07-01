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

const updateUserInfo = (req, res) => {

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
