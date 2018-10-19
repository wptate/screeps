var sourcePriority = require('priority.source');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
	        var used;
	        if (creep.memory.harvestSource == undefined) {
                var sources = creep.room.find(FIND_SOURCES);
                
                var switchSource = _.random(0, 4) == 0;
                //0 local, 1 swamp, 2 enemy, 3 canyon
                if (sourcePriority.getPriority(sources[3]) > sourcePriority.getPriority(sources[0])) {
                    if (switchSource) {
                        used = sources[0];
                    } else {
                        used = sources[3];
                    }
                } else {
                    if (switchSource) {
                        used = sources[3];
                    } else {
                        used = sources[0];
                    }
                }
                creep.memory.harvestSource = used.id;
	        } else {
	            used = Game.getObjectById(creep.memory.harvestSource);
	        }
            //used = sources[0];
            if(creep.harvest(used) == ERR_NOT_IN_RANGE) {
                creep.moveTo(used, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleHarvester;