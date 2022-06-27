const User = require('../models/User.js');
const bcrypt = require('bcrypt');

// For creating new user
const createNewUser = async (req, res) => {
  // Hash password
  let hashedPwd = await bcrypt.hash(req.body.password, 10);
  // Create User object
  const newUser = new User({
    username: req.body.username,
    displayName: req.body.displayName,
    password: hashedPwd
  });

  try {
    await newUser.save();
    res.send(true); // Registered successfully
  } catch(err) {
    console.log(err);
    res.send(false); // Failed to register
  }
};

// For getting the `Register` page
const viewRegisterPage = async (req, res) => {
  res.render('register', { layout: './layouts/register-page' });
};

module.exports = {
  createNewUser: createNewUser,
  viewRegisterPage: viewRegisterPage
}
