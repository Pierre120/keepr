const User = require('../database/models/User.js');

// For adding new user to the database
const registerUser = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    displayName: req.body.displayName,
    password: req.body.password // needs hashing
  });

  try {
    await newUser.save();
    res.redirect('/app');
  } catch (err) {
    console.log(err);
    res.redirect('/register');
  }
};

// For editing info of user
const editUser = (req, res) => {

};

// For deleting a user in a database
const deleteUser = (req, res) => {

};

// For viewing user account
const viewUser = (req, res) => {

};

// For finding a user using his/her username
const findUserByUsername = (req, res) => {

};

// for finding a user using his/her display name
const findUserByDisplayName = (req, res) => {

};
