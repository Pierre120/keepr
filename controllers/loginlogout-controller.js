const bcrypt = require('bcrypt');
const User = require('../models/User.js');

// For accessing the login page
const viewLoginPage = (req, res) => {
  res.render('index');
}

// For logging in users
const loginUser = async (req, res) => {
  // Get credentials of logging in user
  const {username, password} = req.body;
  // Find the user in the db given the username
  const user = await User.findOneByUsername(username);

  // Checks if user exists
  if(!user) {
    // Sends the alert to user
    console.log("User doesn't exists.");
    return sendAlert(res);
  }

  // Checks if the given password is a match
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) {
    // Sends the alert to user
    console.log('Incorrect password.');
    return sendAlert(res);
  }

  // Authenticate and add session
  console.log('Authenticated and Logged in with new Session.');
  req.session.isAuth = true;
  res.send({ isErr: 0, content: '/app' }); // redirect to the home page
}

// for sending alerts
const sendAlert = (res) => {
  const errMsg = 'Invalid username and/or password';

  res.render('partials/alert', {
    type: 'warning',
    message: errMsg
  }, (err, html) => {
    if(err) {
      console.log(err);
      res.send(false);
    } else {
      res.send({ isErr: 1, content: html });
    }
  });
}

// For logging out users
const logoutUser = (req, res) => {
  // Delete the session of the user
  req.session.destroy((err) => {
    if(err) { return console.log(err); }
    console.log('User logged out and session is terminated.');
    res.redirect('/');
  });
}

module.exports = {
  viewLoginPage: viewLoginPage,
  loginUser: loginUser,
  logoutUser: logoutUser
}
