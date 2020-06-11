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
var busboy = require('connect-busboy');
// var env = require('dotenv').load()
var env = require('dotenv').config()
var exphbs = require('express-handlebars');

var options = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'Happy555$',
  database: 'project'
};

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  limit: '150mb',
  extended: false ,
}));

var sessionStore = new MySQLStore(options);

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



// app.use(fileUpload());

app.use(fileUpload({
  limits: { fileSize:30000000 },
}));

//...
app.use(busboy());
// app.use(fileUpload({
//   limits: {
//     fieldSize: 20971520,
//     abortOnLimit: true,
//   },
// }));


//Models
var models = require("./models");

//Routes
var authRoute = require('./routes/auth.js')(app, passport);


//Models
var models = require("./models");

//load passport strategies
require('./config/passport/passport.js')(passport, models.user);
require('./routes/signup.js')(app, passport);

// กลุ่มบัญชีผู้ใช้
require('./routes/alluser.js')(app);
require('./routes/user.js')(app);
require('./routes/forgot-password.js')(app);

// กลุ่มโครงการวิจัย
require('./routes/my-project.js')(app);
require('./routes/allproject.js')(app);

// กลุ่มโครงสร้างพื้นฐานของระบบ
require('./routes/research-type.js')(app);
require('./routes/research-branch.js')(app);
require('./routes/research-form.js')(app);
require('./routes/research-strategic.js')(app);
require('./routes/department.js')(app);

require('./routes/grants.js')(app);

require('./routes/forms.js')(app, session);

//กลุ่มฟังก์ชันผลงาน
require('./routes/portforio.js')(app, session);
require('./routes/my-portforio.js')(app, session);

//กลุ่มฟังก์ชันรายงาน
require('./routes/report.js')(app, session);

//Sync Database
models.sequelize.sync().then(function() {
  console.log('Nice! Database looks fine')
}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!")
});

app.listen(8080);
console.log('8080 is Running...');
