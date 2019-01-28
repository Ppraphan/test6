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
var http = require('http');
var https = require('https');
var fs = require('fs');
var bodyParser = require("body-parser");
var url = require('url');
var querystring = require('querystring');
var env = require('dotenv').load()
var exphbs = require('express-handlebars');

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

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

//Models
var models = require("./models");

//Routes
var authRoute = require('./routes/auth.js')(app, passport);

app.get('/me', function(req, res) {
  var dataid = req.user.id;
  var dataname = req.user.firstname;
  res.render('pages/me', {
    dataid,
    dataname
  });
});
//Models
var models = require("./models");

//load passport strategies
require('./config/passport/passport.js')(passport, models.user);
require('./routes/signup.js')(app, passport);

// กลุ่มโครงสร้างพื้นฐานของระบบ
require('./routes/research-type.js')(app);
require('./routes/research-branch.js')(app);
require('./routes/research-form.js')(app);
require('./routes/research-strategic.js')(app);
require('./routes/department.js')(app);

require('./routes/research-settings.js')(app);

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
