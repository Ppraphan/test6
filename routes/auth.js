var authController = require('../controllers/authcontroller.js');

module.exports = function(app, passport) {

  app.get('/useridcheck', isLoggedIn, authController.useridcheck);

  app.post('/useridcheck/:id',function(req, res) {
    var listID = [];
    var id = req.params.id;

    var sql = "SELECT nameIDHuman FROM project.users";
    con.query(sql, function(err, rows) {
      if (err) throw err;
      for (var i = 0; i < rows.length; i++) {
        listID.push(rows[i].nameIDHuman);
      }
    });

  });

  app.get('/signup', isLoggedIn, authController.signup);

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    session: false,
  }));

  app.get("/signup/getDpment/:catdata", function(req, res) {
    var catdata = req.params.catdata;
    console.log(catdata);

    var sql = "SELECT Sub_Dpment_name FROM project.sub_dpment where Sub_Dpment_Parent ='" + req.params.catdata + "'";
    console.log(sql);
    con.query(sql, function(err, rows) {
      console.log(rows);
      if (err) throw err;
      res.send(rows);
    });
  });


  app.get('/signin', authController.signin);


  // app.get('/', isLoggedIn);
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
