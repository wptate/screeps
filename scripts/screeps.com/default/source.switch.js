var sourcePriority = require('priority.source');

//shouldn't try to switch source on non-existant creeps
var sourceSwitch = {
	getSource : function(creep) {
		var used = creep.memory.harvestSource;
		
		var sources = creep.room.find(FIND_SOURCES);
		if (used == undefined || used == null || Game.getObjectById(used).energy < creep.carryCapacity) {
			//var switchSource = Math.random(sources.length) == 0;
			var switchSource = Math.floor(Math.random()*(sources.length-1));
			
			used = sources[switchSource].id;
			creep.memory.harvestSource = used;
		}
		return used;
	}
}

module.exports = sourceSwitch;