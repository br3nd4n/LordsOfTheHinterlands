
//client side network module
function Network(battle){
	this.socket = battle.socket;
	this.battle = battle;

	var oldlength=0;

	var that = this;
	this.socket.on('objectlist', function(data){ that.receiveObjectList(data); } );
	this.socket.on('objectupdate', function(data){ that.receiveObjectUpdate(data); } );
	this.socket.on('newplayercallback', function(data){ that.receiveNewPlayerCallback(data); } );


}

Network.prototype.resolveNetIDs = function(obj){
	//for each property of this object, check it for netid, if so, reference the net id in the world
	//results in reference based structure
	var BattleData = this.battle.BattleData;

	for(var prop in obj){
		var pobj = obj[prop];
		try {
		if(pobj._netid_ptr !== undefined){
			obj[prop] = BattleData[pobj._netid_ptr];
		} 
	} catch (errx){}
		// else if(typeof(pobj) == "object" && pobj !== null){
		// 	//console.log("rni: "+prop)
		// 	//console.log(pobj)
		// 	this.resolveNetIDs(pobj);
		// } 
	}
}

Network.prototype.receiveObjectList = function(data){
	console.log('receiveObjectList');
    var BattleData = that.battle.BattleData;
    for(d in data){
      BattleData[data[d].netid] = data[d].data;
    }
    for(d in BattleData){
      this.resolveNetIDs(BattleData[d]);
    }
    that.oldlength=BattleData.length;
    this.battle.events.emit("init");
}

Network.prototype.receiveObjectUpdate = function(data){
	var BattleData = this.battle.BattleData;

	//send ping back immediately since we'll block processing and we can use it to measure how long this takes
	//d = new Date();
	//lastPing = d.getTime()
	//this.world.socket.emit('ping', { time: lastPing });
	//this.world.socket.emit('ping', { time: (new Date()).getTime() });

	console.log("objectupdate");

	//update loop
	for(d in data){
		var netid = data[d].netid;

		if(BattleData[netid] === undefined){ //new object received
			BattleData[netid] = data[d].data;
			try{
				if((BattleData[netid].type='player') && (BattleData.length != this.battle.oldlength)) {
					console.log('new player added');
					this.battle.players.push(netid);


				}
			} catch(ex){}
		} else {
			//update to existing object
			var obj = data[d].data;
			for(prop in obj){
				BattleData[netid][prop] = obj[prop];
				//console.log("updating prop: "+prop+" = "+obj[prop]);
			}
		}
	}

	//fix up any pointers
	for(d in BattleData){
		this.resolveNetIDs(BattleData[d]);	
	}

	this.battle.events.emit("update");
}



Network.prototype.receiveNewPlayerCallback = function(data){
	var BattleData = this.battle.BattleData;

	//send ping back immediately since we'll block processing and we can use it to measure how long this takes
	//d = new Date();
	//lastPing = d.getTime()
	//this.world.socket.emit('ping', { time: lastPing });
	//this.world.socket.emit('ping', { time: (new Date()).getTime() });

	console.log("new player callback");

	console.log(data);
/*
	//update loop
	for(d in data){
		var netid = data[d].netid;

		if(BattleData[netid] === undefined){ //new object received
			BattleData[netid] = data[d].data;
			try{
				if((BattleData[netid].type='player') && (BattleData.length != this.battle.oldlength)) {
					console.log('new player added');
					this.battle.players.push(netid);


				}
			} catch(ex){}
		} else {
			//update to existing object
			var obj = data[d].data;
			for(prop in obj){
				BattleData[netid][prop] = obj[prop];
				//console.log("updating prop: "+prop+" = "+obj[prop]);
			}
		}
	}

	//fix up any pointers
	for(d in BattleData){
		this.resolveNetIDs(BattleData[d]);	
	}
*/

	this.battle.events.emit("newplayercallback");
}
