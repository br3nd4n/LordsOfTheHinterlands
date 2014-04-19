//battle.js for client

function Battle(socket){
	this.socket = socket;
	this.BattleData = {};// new Array(); //{};
	this.network = new Network(this);
	this.events = new EventEmitter();
	this.events.on("init", function(){ 
		console.log("world init"); 
	});
	
	this.events.on("update", function(){ 
		console.log("world update"); 
	});

	var that = this

	this.events.on("init", function(){

	});

	this.events.on("update", function(){ 

	});
}

//Battle.prototype.__proto__ = events.EventEmitter.prototype;