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
  const errMsg = 'Invalid username and/or password';

  // Checks if user exists
  if(!user) {
    // Sends the alert to user
    res.render('partials/alert', {
      type: 'warning',
      message: errMsg
    }, (err, html) => {
      if(err) {
        console.log(err);
        return res.send(false);
      } else {
        return res.send(html)
      }
    });
  }

  // Checks if the given password is a match
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) {
    // Sends the alert to user
    res.render('partials/alert', {
      type: 'warning',
      message: errMsg
    }, (err, html) => {
      if(err) {
        console.log(err);
        return res.send(false);
      } else {
        return res.send(html)
      }
    });

    // Authenticate and add session
    req.session.isAuth = true;
    res.redirect('/app'); // redirect to the home page
  }
}

// For logging out users
const logoutUser = (req, res) => {
  // Delete the session of the user
  req.session.destroy((err) => {
    if(err) { return console.log(err); }
    res.redirect('/');
  });
}

module.exports = {
  viewLoginPage: viewLoginPage,
  loginUser: loginUser,
  logoutUser: logoutUser
}
