var authController = require('../controllers/authcontroller.js');

module.exports = function(app, passport) {


  app.get('/signin', authController.signin);



  app.get('/', isLoggedIn, authController.dashboard);

  app.get('/logout', authController.logout);

  app.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/signin'
  }));


  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/signin');
  }

  app.all('*', function(req, res, next) {
    if (req.path === '/' || req.path === '/login')
      next();
    else
      isLoggedIn(req, res, next);
  });
}
