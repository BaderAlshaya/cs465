'use strict';

var http = require('http'); // do not change this line
var querystring = require('querystring'); // do not change this line

// http://localhost:8080/form should return the form as shown below
//   res.writeHead(200, {
//   	'Content-Type': 'text/html'
//   });
//
//   res.write('<!DOCTYPE html>');
//   res.write('<html>');
//   	res.write('<body>');
//   		res.write('<form action="/new" method="post">');
//   			res.write('<input type="text" name="name">');
//   			res.write('<input type="text" name="message">');
//   			res.write('<input type="submit" value="submit">');
//   		res.write('</form>');
//   	res.write('</body>');
//   res.write('</html>');
//
//   res.end();

// http://localhost:8080/new should retrieve the post data, save the name / message (in a global variable) and return 'thank you for your message' in plain text
// http://localhost:8080/list should return the stored messages (from the global variable) 'name: message' in plain text
// http://localhost:8080/form should return the form as shown above
// http://localhost:8080/new should retrieve the post data, save the name / message (in a global variable) and return 'thank you for your message' in plain text
// http://localhost:8080/list should return the stored messages (from the global variable) 'name: message\nanother name: another message' in plain text
// [the server restarts and looses all messages]
// http://localhost:8080/list should return '' in plain text

var list = [];
var server = http.createServer(function(req, res) {
  if (req.url == '/form') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.write('<!DOCTYPE html>');
    res.write('<html>');
    res.write('<body>');
    res.write('<form action="/new" method="post">');
    res.write('<input type="text" name="name">');
    res.write('<input type="text" name="message">');
    res.write('<input type="submit" value="submit">');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    res.end();
  } else if (req.url == '/new') {
    var result = '';
    req.on('data', function(data) {
      result += data;
    });
    req.on('end', function() {
      var attrs = querystring.parse(result);
      if (attrs.name && attrs.message)
        list.push(attrs.name + ': ' + attrs.message);
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write('thank you for your message');
      res.end();
    });
    req.on('error', function() {
      res.end();
    });
  } else if (req.url == '/list') {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.write(list.join('\n'));
    res.end();
  } else
    res.end();
});

server.listen(process.env.PORT || 8080);
