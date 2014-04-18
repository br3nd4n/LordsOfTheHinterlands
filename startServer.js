var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.db');

var fs = require('fs')
  , express = require('express')
  , app = express()
  , http = require('http');

var gameServer = require('./gameServer.js');

	var users=[];

	db.all("select rowid,* from users",function(err,row){
		row.forEach(function (user){
			users.push(user);
		});
	});
db.close();
//setup the app & socketio in this weird way thanks to express
app.use(express.basicAuth(
	function(user, pass) {
		//users.push([1,user,pass]);
		var found=false;
		users.forEach(function(userRec){
			found = found || (userRec.tag===user && userRec.password===pass)
		});;
		return found;

}));

var server = http.createServer(app);
var io = require('socket.io').listen(server);
io.set('log level', 1);



server.listen(8090);
app.use(express.static(__dirname + '/client/'));

var gameServer = new gameServer(io);


/*

//instantiate the world object - which includes a network channel

*/