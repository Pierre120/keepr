
// To check if the user is logged in
const isLoggedIn = (req, res, next) => {
  if(req.session.isAuth) {
    next();
  } else {
    res.redirect('/');
  }
};

// To check if the user is not logged in
const isNotLoggedIn = (req, res, next) => {
  if(req.session.isAuth) {
    res.redirect('/app');
  } else {
    next();
  }
}

module.exports = {
  isLoggedIn: isLoggedIn,
  isNotLoggedIn: isNotLoggedIn
}
