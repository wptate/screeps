var constants = require('constant.vars');
var sourceSwitch = require('source.switch');

var spawnName = "Spawn1";
var flagName = "Flag1";

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
	        var targetSource = Game.getObjectById(sourceSwitch.getSource(creep));
			if(creep.harvest(targetSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetSource, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets != null && targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
				creep.moveTo(Game.flags[flagName]);
			}
        }
	},
	
    spawn: function(spawnName, maxHarvesters, roomSize, y, z) {
	    var roleTxt = 'harvester';
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == roleTxt);
	    if(harvesters.length < maxHarvesters && Game.spawns[spawnName].spawning == null) {
            var newName = 'Harvester' + Game.time;
			console.log("spawning " + newName);
            Game.spawns[spawnName].spawnCreep(global.bodyHarvesters[roomSize], newName, {memory: {role: roleTxt}});
			
        }
	}
};

module.exports = roleHarvester;