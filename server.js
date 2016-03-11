// server.js

// require express framework and additional modules
var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	User = require('./models/user'),
	session = require('express-session'),
  http = require('http').Server(app),
  io = require('socket.io')(http);

// middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost/projectx');
// set session options
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 30 * 60 * 1000 } // 30 minute cookie lifespan (in milliseconds)
}));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

// signup route with placeholder response
app.get('/signup', function(req, res){
	res.render('signup');
});

// create a user - creates a new user with a sececure password
app.post('/users', function (req, res) {
	// use the email and password to authenticate here
  console.log(req.body);
  User.createSecure(req.body.email, req.body.password, function (err, newUser) {
    req.session.userId = newUser._id;
    res.redirect('/profile');
  });
});

// login route with placeholder response
app.get('/login', function(req, res){
	res.render('login');
});

//authenticate the user and set the session
app.post('/sessions', function (req,res) {
	// call authenticate function to check if password user entered is correct
	User.authenticate(req.body.email, req.body.password, function(err, loggedInUser) {
		if(err){
			console.log('authentication error: ', err);
			res.status(500).send();
		} else {
			console.log('setting session user id', loggedInUser._id);
			req.session.userId = loggedInUser._id;
			res.redirect('/profile');
		}
	});
});

// show user profile page
app.get('/profile', function (req, res) {
  console.log('session user id: ', req.session.userId);
  // find the user currently logged in
  User.findOne({_id: req.session.userId}, function (err, currentUser) {
    if (err){
      console.log('database error: ', err);
      res.redirect('/login');
    } else {
      // render profile template with user's data
      console.log('loading profile of logged in user');
      res.render('user-show.ejs', {user: currentUser});
    }
  });
});

// Logout route
app.get('/logout', function (req, res) {
  // remove the session user id
  req.session.userId = null;
  // redirect to login (for now)
  res.redirect('/login');
});

app.get('/', function (req, res){
	res.render('index');
});

// listen on port 3000
http.listen(3000, function(){
	console.log('server is alive on localhost:3000');
});