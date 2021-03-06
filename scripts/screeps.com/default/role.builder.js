var constants = require('constant.vars');
var sourcePriority = require('priority.source');

var spawnName = "Spawn1";
var flagName = "Flag2";

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.building && creep.carry.energy == 0 && Game.spawns[spawnName].energy >= 300) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets != null && targets.length > 0) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
				creep.moveTo(Game.flags[flagName]);
			}
	    } else {
	        var spawn = Game.spawns[spawnName];
            if(creep.withdraw(spawn, RESOURCE_ENERGY, (creep.carryCapacity - creep.carry)) == ERR_NOT_IN_RANGE) {
              creep.moveTo(spawn.pos, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	        /*var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }*/
	    }
	},
	
    spawn: function(spawnName, maxBuilders, roomSize, y, z) {
	    var roleTxt = 'builder';
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == roleTxt);
	    if(builders.length < maxBuilders) {
            var newName = 'Builder' + Game.time;
			console.log("spawning " + newName);
            Game.spawns[spawnName].spawnCreep(global.bodyBuilders[roomSize], newName, {memory: {role: roleTxt}});
        }
	}
};

module.exports = roleBuilder;