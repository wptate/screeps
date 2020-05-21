var sourcePriority = require('priority.source');

//shouldn't try to switch source on non-existant creeps
// Don't random, pick highest priority and go
var sourceSwitch = {
	getSourceRand : function(creep) {
		var used = creep.memory.harvestSource;
		
		var sources = creep.room.find(FIND_SOURCES);
		if (used == undefined || used == null || Game.getObjectById(used).energy < creep.carryCapacity) {
			var switchSource = Math.floor(Math.random()*(sources.length-1));
			// TODO Better switching/monitoring so we don't retest the same one more than once here.
			while (sourcePriority.getPriority(sources[switchSource]) <= 0) {
			    switchSource = Math.floor(Math.random()*(sources.length-1));
			}
			used = sources[switchSource].id;
			creep.memory.harvestSource = used;
		}
		return used;
	},

	getSource : function(creep) {
	  return sourcePriority.getHighestPriority(creep);
	}
}

module.exports = sourceSwitch;