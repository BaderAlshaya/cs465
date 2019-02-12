'use strict';

var express = require('express'); // do not change this line
var passport = require('passport'); // do not change this line
var strategy = require('passport-http'); // do not change this line

// note: should the server restart, the browser will still technically be logged in since we are using the http basic access authentication which lets the browser submit the username and the password at each request
var server = express();
server.use(passport.initialize());

// preface: use the passport middleware and only grant the user "test" with the password "logmein" access
passport.use(new strategy.BasicStrategy(
  function(user, pass, login) {
    if (user == 'test' && pass == 'logmein')
      return login(null, true);
    return login(null, false);
  }
));

// http://localhost:8080/hello should return 'accessible to everyone' in plain text
server.get('/hello', function(req, res) {
  res.status(200);
  res.set({
    'Content-Type': 'text/plain'
  });
  res.write('accessible to everyone');
  res.end();
});

server.use(passport.authenticate('basic', {
  'session': false
}));

// http://localhost:8080/world should return 'only accessible when logged in' in plain text if user the user is authenticate, otherwise will prompt for the username and password
// http://localhost:8080/test should return 'only accessible when logged in' in plain text if user the user is authenticate, otherwise will prompt for the username and password
server.get('*', function(req, res) {
  res.status(200);
  res.set({
    'Content-Type': 'text/plain'
  });
  res.write('only accessible when logged in');
  res.end();
});

server.listen(process.env.PORT || 8080);
