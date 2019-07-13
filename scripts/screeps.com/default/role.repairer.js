var repairTarget = require('target.repair');
var constants = require('constant.vars');
var sourcePriority = require('priority.source');

var spawnName = "Spawn1";
var flagName = "Flag2";

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.repairing && creep.carry.energy == 0 && Game.spawns[spawnName].energy >= 300) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
	        creep.say('🚧 repair');
	    }

	    if(creep.memory.repairing) {
	        var target;
	        if (creep.memory.repairTarget) {
	            target = Game.getObjectById(creep.memory.repairTarget);
	            if (target !== null && target.hits < target.hitsMax) {
	                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
	                    creep.moveTo(target);
	                }
	            } else {
	                target = Game.getObjectById(repairTarget.find(creep));
	            }
	        } else {
	            target = Game.getObjectById(repairTarget.find(creep));
	        }
	        if (target !== null) {
	            creep.memory.repairTarget = target.id;
	        } else {
	            creep.memory.repairTarget = null;
	            creep.memory.repairing = false;
				creep.moveTo(Game.flags[flagName]);
	        }

	        
            if(creep.repair(Game.getObjectById(target)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(target), {visualizePathStyle: {stroke: '#ffffff'}});
            }
	    } else {
	        var spawn = Game.spawns[spawnName];
            if(creep.withdraw(spawn, RESOURCE_ENERGY, (creep.carryCapacity - creep.carry)) == ERR_NOT_IN_RANGE) {
              creep.moveTo(spawn.pos, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	},
	
    spawn: function(spawnName, maxRepairers, roomSize, y, z) {
	    var roleTxt = 'repairer';
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == roleTxt);
	    if(repairers.length < maxRepairers) {
            var newName = 'Repairer' + Game.time;
			console.log("spawning " + newName);
            Game.spawns[spawnName].spawnCreep(global.bodyRepairers[roomSize], newName, {memory: {role: roleTxt}});
        }
	}
};

module.exports = roleRepairer;