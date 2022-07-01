const User = require('../models/User.js');

const viewAccountPage = async (req, res) => {
  // retrieve user info to be viewed
  const viewUser = await User.findOneByUsername(req.params.username);
  // determine if the owner is viewing his/her account page
  const isOwner = (req.session.user === viewUser._id) ? true : false;

  
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
