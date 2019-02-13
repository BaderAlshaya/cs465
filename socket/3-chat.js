'use strict';

var express = require('express'); // do not change this line
var socket = require('socket.io'); // do not change this line
var assert = require('assert'); // do not change this line

var server = express();

server.use('/', express.static(__dirname + '/'));

var io = socket(server.listen(process.env.PORT || 8080)); // do not change this line

io.on('connection', function(objectSocket) {
  // send everyone the 'clients' event, containing an array with the ids of the connected clients - example: { 'strClients':['GxwYr9Uz...','9T1P4pUQ...'] }
  // send everyone the 'message' event, containing a message that a new client connected - example: { 'strFrom':'server', 'strTo':'everyone', 'strMessage':'9T1P4pUQ... connected' }
  objectSocket.strIdent = objectSocket.id;
  io.to(objectSocket.strIdent).emit('hello', {
    'strIdent': objectSocket.strIdent
  });
  io.emit('clients', {
    'strClients': Object.keys(io.sockets.sockets)
  });
  io.emit('message', {
    'strFrom': 'server',
    'strTo': 'everyone',
    'strMessage': objectSocket.strIdent + ' connected'
  });

  objectSocket.on('message', function(objectData) {
    // if the message should be received by everyone, broadcast it accordingly
    // if the message has a single target, send it to this target as well as to the origin
    objectData.strFrom = objectSocket.strIdent;

    if (objectData.strTo == 'everyone')
      io.emit('message', objectData);
    else {
      io.to(objectData.strTo).emit('message', objectData);
      if (objectSocket.strIdent != objectData.strTo)
        objectSocket.emit('message', objectData);
    }
  });

  objectSocket.on('disconnect', function() {
    // send everyone the 'clients' event, containing an array of the connected clients - example: { 'strClients':['GxwYr9Uz...'] }
    // send everyone the 'message' event, containing a message that an existing client disconnected - example: { 'strFrom':'server', 'strTo':'everyone', 'strMessage':'9T1P4pUQ... disconnected' }
    io.emit('clients', {
      'strClients': Object.keys(io.sockets.sockets)
    });

    io.emit('message', {
      'strFrom': 'server',
      'strTo': 'everyone',
      'strMessage': objectSocket.strIdent + ' disconnected'
    });
  });
});
