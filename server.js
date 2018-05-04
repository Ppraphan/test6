// load the things we need
var express = require('express');
var app = express();

var mysql = require('mysql');

var con = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"test"
});

con.connect(function(err){
	if(err)throw err;
	console.log("Connedted!");
});

app.use(express.static(__dirname + '/public'));
// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
	res.render('pages/index');
});

// about page
app.get('/about', function(req, res) {
	res.render('pages/about');
});

app.get('/forms', function(req, res) {
	res.render('pages/forms');
});

app.listen(8080);
console.log('8080 is Running...');
