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
		console.log(battle.battleData)
		for (obj in battle.battleData){
			 if ((battle.battleData[obj].GameServerTime!==undefined)) {
				updateTime =  (new Date()).getTime() - lastUpdate;
				lastUpdate = (new Date()).getTime();
			}

		}

	});

	this.events.on("update", function(){ 

		for (obj in battle.battleData){
				var xobj = battle.battleData[obj];
				
	 			if ((xobj.GameServerTime!==undefined))		{
					updateTime =  Date.now() - lastUpdate;
					lastUpdate = Date.now();
				} 
				else
					if (xobj== undefined){
				} else {
			}
		}


	});
}

//Battle.prototype.__proto__ = events.EventEmitter.prototype;