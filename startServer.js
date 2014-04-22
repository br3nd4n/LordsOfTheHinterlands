
var fs = require('fs')
  , express = require('express')
  , app = express()
  , http = require('http');


var gameServer = require('./gameServer.js');


var server = http.createServer(app);
var io = require('socket.io').listen(server);
io.set('log level', 1);



server.listen(8090);


app.use(express.static(__dirname + '/client/'));



var gameServer = new gameServer(io);
