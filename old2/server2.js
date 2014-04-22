var connect = require('connect');

var players = [];
var units = [];

var x=connect.createServer(
    connect.static(__dirname)
).listen(8090,function(object){

console.log(object);

});



var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 8070});
  
wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('received: %s', message);
    });
    ws.send('something');
});