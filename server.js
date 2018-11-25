//npm modules
var uuid = require('uuid/v4')
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var axios = require('axios');
var bcrypt = require('bcrypt-nodejs');
var express = require('express');
var app = express();
var mysql = require('mysql');
var fileUpload = require('express-fileupload');
var Vue = require('vue');
var http = require('http');
var https = require('https');
var fs = require('fs');
var bodyParser = require("body-parser");
var url = require('url');
var querystring = require('querystring');
var env = require('dotenv').load()
var exphbs = require('express-handlebars');
//Models
var models = require("./models");
//load passport strategies
require('./config/passport/passport.js')(passport, models.user);
require('./routes/signup.js')(app, passport);

//---- configure passport.js to use the local strategy
// passport.use(new LocalStrategy({
//     usernameField: 'email'
//   },
//   (email, password, done) => {
//     axios.get(`http://localhost:5000/users?email=${email}`)
//       .then(res => {
//         const user = res.data[0]
//         if (!user) {
//           return done(null, false, {
//             message: 'Invalid credentials.\n'
//           });
//         }
//         if (!bcrypt.compareSync(password, user.password)) {
//           return done(null, false, {
//             message: 'Invalid credentials.\n'
//           });
//         }
//         return done(null, user);
//       })
//       .catch(error => done(error));
//   }
// ));
//
// //---- tell passport how to serialize the user
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
//
// passport.deserializeUser((id, done) => {
//   axios.get(`http://localhost:5000/users/${id}`)
//     .then(res => done(null, res.data))
//     .catch(error => done(error, false))
// });

//---- add & configure middleware


var options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'project'
};

var sessionStore = new MySQLStore(options);

app.use(fileUpload());
app.use(express.static(__dirname + '/public'));

//---- set the view engine to ejs
app.set('view engine', 'ejs', 'vue');

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: true,
  saveUninitialized: true,
}));

// For Passport
// app.use(session({
//   secret: 'keyboard cat',
//   resave: true,
//   saveUninitialized: true
// })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(bodyParser.json());



// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "project"
// });
//
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connedted!");
// });



//--- Define authentication middleware BEFORE your routes
// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/login')
// }
//
// app.all('*', function(req, res, next) {
//   if (req.path === '/' || req.path === '/login')
//     next();
//   else
//     ensureAuthenticated(req, res, next);
// });

//---- index page
// app.get('/',  function(req, res, next) {
//   res.render('pages/index');
// });

//Models
var models = require("./models");

//Routes
var authRoute = require('./routes/auth.js')(app, passport);


//---- create the login get and post routes
// app.get('/login', (req, res) => {
//   res.render('pages/login');
// });
//
// app.post('/login', (req, res, next) => {
//   passport.authenticate('local', (err, user, info) => {
//     if (info) {
//       return res.send(info.message)
//     }
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.redirect('/login');
//     }
//     req.login(user, (err) => {
//       var me = req.user.id;
//       if (err) {
//         return next(err);
//       }
//       return res.redirect('/');
//     })
//   })(req, res, next);
// });
//
//
// app.get('/logout', function(req, res) {
//   req.session.destroy(function(err) {
//
//     res.redirect('/'); //Inside a callback… bulletproof!
//   });
// });



app.get('/me', function(req, res) {
  var dataid = req.user.id;
  var dataname = req.user.firstname;
  // console.log(dataid,dataname);
  res.render('pages/me', {
    dataid,
    dataname
  });
});

require('./routes/Department.js')(app);

require('./routes/Research-Type.js')(app);
require('./routes/grants.js')(app);
require('./routes/forms.js')(app, session);

//Sync Database
models.sequelize.sync().then(function() {
  console.log('Nice! Database looks fine')
}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!")
});


app.listen(8080);
console.log('8080 is Running...');
