//battle.js for client

function Battle(socket){
	this.socket = socket;
	this.BattleData = [];// new Array(); //{};
	this.network = new Network(this);
	this.events = new EventEmitter();
	var that = this;

	this.events.on("init", function(data){
		console.log(data);
		//that.BattleData.push(player,otherPlayer);
		for (obj in this.battleData){
			 if ((this.BattleData[obj].GameServerTime!==undefined)) {
				updateTime =  (new Date()).getTime() - lastUpdate;
				lastUpdate = (new Date()).getTime();
			}

		}

	});


	this.events.on("update", function(data){
		for (obj in that.BattleData){
				var xobj = that.BattleData[obj];

				if(xobj.type!==undefined){
				if (xobj.type=='player'){
					console.log("new player update");	
				}				
			}
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