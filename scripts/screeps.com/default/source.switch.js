var sourcePriority = require('priority.source');

//shouldn't try to switch source on non-existant creeps
var sourceSwitch = {
	getSource : function(creep) {
		var used;
		
		var sources = creep.room.find(FIND_SOURCES);
		if (creep.memory.harvestSource == undefined || Game.getObjectById(creep.memory.harvestSource).energy < creep.carryCapacity) {
			//var switchSource = Math.random(sources.length) == 0;
			var switchSource = Math.floor(Math.random()*(sources.length-1));
			console.log("sources: " + sources);
			
			console.log("sources: " + JSON.stringify(sources[1]));
			console.log("switchSource: " + switchSource);
			used = sources[switchSource];
			console.log("used: " + used);
			creep.memory.harvestSource = used.id;
		}
		return used;
	}
}

module.exports = sourceSwitch;