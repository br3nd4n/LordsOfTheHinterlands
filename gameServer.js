
//basic GameServer model
//increments the GameServerTime whenever it is updated

//todo: GameServer model is basically an event-emitter as described in the node.js documentation
//http://nodejs.org/api/events.html#events_class_events_eventemitter
// if GameServer model was made to be an event emitter, game objects could attach actions to the GameServer update event easily

//var fs = require('fs');
var events = require('events');
var sqlite3 = require('sqlite3').verbose();

exports = module.exports = GameServer;

function GameServer(io) {
	this.GameServerTime = 0;
	this.clients = 0;
	this.io = io;

	var players=[];
	var that = this;
	var db = new sqlite3.Database('./data.db');





	var userBattles=[];
	db.all("select rowid,* from userBattles",function(err,row){
		row.forEach(function (userBattle){
			userBattle.activeCards=undefined;
			try{userBattle.activeCards=JSON.parse(userBattle.jsonActiveCards);}catch(ex){}

			userBattle.currentDeck=undefined;
			try{userBattle.currentDeck=JSON.parse(userBattle.jsonCurrentDeck);}catch(ex){}

			delete userBattle['jsonActiveCards'];
			delete userBattle['jsonCurrentDeck'];  
			userBattles.push(userBattle);
		});
	});

	var battles=[];
	db.all("select rowid,* from battles",function(err,row){
		row.forEach(function(battle){
			battle.boardState=undefined;
			try{battle.boardState=JSON.parse(battle.jsonBoardState);}catch(ex){}
			delete battle['jsonBoardState'];
			battles.push(battle);
		});

	});


	var boards=[];
	db.all("select rowid,* from boards",function(err,row){
		row.forEach(function(board){
			board.boardObject=undefined;
			try{board.boardObject=JSON.parse(board.jsonBoardObject);}catch(ex){}
			delete board['jsonBoardObject'];
			boards.push(board);
		});
	});

	var cities=[];
	db.all("select rowid,* from cities",function(err,row){
		row.forEach(function(city){
			city.activeBuildings=undefined;
			try{city.activeBuildings=JSON.parse(city.jsonActiveBuildings);}catch(ex){}
			delete city['jsonActiveBuildings'];
			cities.push(city);
		});
	});

	var buildings=[];
	db.all("select rowid,* from buildinglibrary",function(err,row){
		row.forEach(function(building){
			building.buildingObject=undefined;
			try{building.buildingObject=JSON.parse(building.jsonBuildingObject);}catch(ex){}
			delete building['jsonBuildingObject'];
			buildings.push(building);
		});

	});

	var cards=[];
	db.all("select rowid,* from cardlibrary",function(err,row){
	//console.log(row);
		row.forEach(function(card){
			card.cardObject=undefined;
			try{card.cardObject=JSON.parse(card.jsonCardObject);}catch(ex){}
			delete card['jsonCardObject'];
			cards.push(card);
		});

	});





	this.io.sockets.on('connection', function(socket){ 
		console.log('socket connection');
		


		socket.on("login",function(data){
			console.log("login");
			var p = {};
			p.name = data.fname;
			p.myx = 10;
			p.myy = 10;
	//		p.dirty = false;

			var id = players.push(p);
			id-=1;
			players[id].id = id;

			console.log(players[id]);
			this.emit("logincallback",{playerid: id,players: players});
		});

		socket.on('positionChanged', function (data) {
			console.log('positionChanged');


			players[data.playerid].myx = data.newx;
			players[data.playerid].myy = data.newy;
	//		players[data.id].dirty = true;
			that.io.sockets.emit('updatePlayer',players[data.playerid]);			

		});
	});

};


GameServer.prototype.__proto__ = events.EventEmitter.prototype;

GameServer.prototype.newConnection = function(socket){
	this.clients++;

	socket.on('disconnect', function(socket){ that.clients--; });
};





