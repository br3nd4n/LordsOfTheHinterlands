//player.js
//fires events based on the player
//relatively lame object that other modules can attach properties to

var events = require("events")

exports = module.exports = Player;

var playerCount=0;

function Player(world, socket){
	this.socket = socket;
	playerCount++;
	this.name = "player derp " + playerCount;
	this.x  =Math.floor(Math.random()*40);
	this.y  =Math.floor(Math.random()*18);
	this.modelid = 0; 
	this.on("player_name_set", 
		function(player, data){ 
			if(data.name != undefined){
				player.name = name;
			}
		} 
	);

}

Player.prototype.getSyncProps = function(){
	return ['name','x','y','modelid'];
}

//shim into the event callback so we can insert the player message
Player.prototype.on = function(event, callback){
	var that = this;
	this.socket.on(event, function(data){
		callback(that, data);
	})
}

Player.prototype.positionChanged = function(data){
	that.x =data['newx'];
	that.y =data['newy'];
	//that.emit();
}

Player.prototype.__proto__ = events.EventEmitter.prototype;