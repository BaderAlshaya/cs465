'use strict';

var http = require('http'); // do not change this line
var url = require('url'); // do not change this line
var querystring = require('querystring'); // do not change this line

var server = http.createServer(function(req, res) {
  // http://localhost:8080/ should return 'you have accessed the root' in plain text
  if (req.url == '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('you have accessed the root');
    return res.end();
  }

  // http://localhost:8080/test/hello should return 'you have accessed "hello" within test' in plain text
  // http://localhost:8080/test/world should return 'you have accessed "world" within test' in plain text
  if (req.url.search('/test/') != -1) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('you have accessed "' + decodeURIComponent(req.url.substr(6)) + '" within test');
    return res.end();
  }

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
  if (req.url.search('/attributes') != -1) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<!DOCTYPE html><html><body><table border="1">');
    var attrs = querystring.parse(url.parse(req.url).query);
    for (var strKey in attrs)
      res.write('<tr><td>' + strKey + '</td><td>' + attrs[strKey] + '</td></tr>');
    res.write('</table></body></html>');
    return res.end();
  }
  return res.end();
});

server.listen(process.env.PORT || 8080);
