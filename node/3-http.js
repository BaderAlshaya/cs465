'use strict';

var http = require('http'); // do not change this line

var server = http.createServer(function(req, res) {
  // http://localhost:8080/missing should return a status code 404 with 'your princess is in another castle' in plain text
  if (req.url == '/missing') {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.write('your princess is in another castle');
    return res.end();
  }

  // http://localhost:8080/redirect should redirect the request to '/redirected' by using 302 as the status code
  if (req.url == '/redirect') {
    res.writeHead(302, {
      'Location': '/redirected'
    });
    return res.end();
  }

  // http://localhost:8080/cache should return 'cache this resource' in plain text and set the cache max age to a day
  if (req.url == '/cache') {
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Cache-Control': 'max-age=86400'
    });
    res.write('cache this resource');
    return res.end();
  }

  // http://localhost:8080/cookie should return 'i gave you a cookie' in plain text and set 'hello=world' as a cookie
  if (req.url == '/cookie') {
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Set-Cookie': 'hello=world'
    });
    res.write('i gave you a cookie');
    return res.end();
  }

  // http://localhost:8080/check should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie
  if (req.url == '/check') {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    var cookie = '' + req.headers.cookie;
    if (cookie.search('hello') != -1)
      res.write('yes');
    else
      res.write('no');
    return res.end();
  }
  return res.end();
});

server.listen(process.env.PORT || 8080);
