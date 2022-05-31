const User = require('../database/models/User.js');

// For adding new user to the database
const registerUser = async (req, res) => {
  // TODO: hash password using bcrypt before storing
  const newUser = new User({
    username: req.body.username,
    displayName: req.body.displayName,
    password: req.body.password // needs hashing
  });

  // TODO: add session

  try {
    await newUser.save();
    res.redirect('/app');
  } catch (err) {
    console.log(err);
    res.redirect('/register');
  }
};

// For editing info of user
const editUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { username, displayName, password } = req.body;
    // TODO: hash password using bcrypt before storing
    user.username = username;
    user.displayName = displayName;
    user.password = password;
    await user.save();
    res.redirect('/accounts/' + req.params.id);
  } catch (err) {
    console.log(err);
    res.redirect('/accounts/' + req.params.id);
  }
};

// For deleting a user in a database
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.redirect('/accounts/' + req.params.id);
  }
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
