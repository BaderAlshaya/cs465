'use strict';

var express = require('express'); // do not change this line

// http://localhost:8080/ should return 'you have accessed the root' in plain text

// http://localhost:8080/test/hello should return 'you have accessed "hello" within test' in plain text

// http://localhost:8080/test/world should return 'you have accessed "world" within test' in plain text

// http://localhost:8080/attributes?hello=world&lorem=ipsum should return the following as html (row order might differ)
//   <!DOCTYPE html>
//   <html>
//     <body>
//       <table border="1">
//         <tr><td>hello</td><td>world</td></tr>
//         <tr><td>lorem</td><td>ipsum</td></tr>
//       </table>
//     </body>
//   </html>

// http://localhost:8080/attributes?first=1&second=2&third=3 should return the following as html (row order might differ)
//   <!DOCTYPE html>
//   <html>
//     <body>
//       <table border="1">
//         <tr><td>first</td><td>1</td></tr>
//         <tr><td>second</td><td>2</td></tr>
//         <tr><td>third</td><td>3</td></tr>
//       </table>
//     </body>
//   </html>

var server = express();
server.get('/', function(req, res) {
  res.status(200);
  res.set({
    'Content-Type': 'text/plain'
  });
  res.write('you have accessed the root');
  res.end();
});

server.get('/test/:var', function(req, res) {
  res.status(200);
  res.set({
    'Content-Type': 'text/plain'
  });
  res.write('you have accessed "' + req.params.var + '" within test');
  res.end();
});

server.get('/attributes', function(req, res) {
  res.status(200);
  res.set({
    'Content-Type': 'text/html'
  });
  res.write('<!DOCTYPE html><html><body><table border="1">');
  for (var str in req.query) {
    res.write('<tr><td>' + str + '</td><td>' + req.query[str] + '</td></tr>');
  }
  res.write('</table></body></html>');
  res.end();
});

server.get('/unexpected', function(req, res) {
  res.end();
});

server.listen(process.env.PORT || 8080);
