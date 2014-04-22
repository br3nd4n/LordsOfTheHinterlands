//player.js
//fires events based on the player
//relatively lame object that other modules can attach properties to

var events = require("events")
exports = module.exports = Player;


function Player(world, socket){
	that = this;
	this.socket = socket;

	this.position=[];
	this.position.push(0);
	this.position.push(0);
	
	this.on("player_name_set", 
		function(player, data){ 
			if(data.name != undefined){
				player.name = name;
			}
		} 
	);
	this.on("positionChanged", 
		function(player, data){ 
			if(data.position != undefined){
				player.position = name;
			}
		} 
	);

}

Player.prototype.getSyncProps = function(){
	return ['name','x','y','modelid','type'];
}

//shim into the event callback so we can insert the player message
Player.prototype.on = function(event, callback){
	//var that = this;
	console.log('player event');
	console.log(event);
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