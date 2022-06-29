const bcrypt = require('bcrypt');
const User = require('../models/User.js');

const viewLoginPage = (req, res) => {
  res.render('index');
}

const loginUser = async (req, res) => {
  const {username, password} = req.body;
  const user = await User.findOneByUsername(username);
  const errMsg = 'Invalid username and/or password';

  if(!user) {
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

  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch) {
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

    req.session.isAuth = true;
    res.redirect('/app');
  }
}


const logoutUser = (req, res) => {

}

module.exports = {
  viewLoginPage: viewLoginPage,
  loginUser: loginUser,
  logoutUser: logoutUser
}
