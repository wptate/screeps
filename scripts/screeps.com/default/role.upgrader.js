var constants = require('constant.vars');
var sourcePriority = require('priority.source');
var sourceSwitch = require('source.switch');

var spawnName = "Spawn1";
var flagName = "Flag2";

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
		}
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            //var spawn = creep.room.find(FIND_MY_SPAWNS);
            var spawn = Game.spawns[spawnName];
            if(Game.spawns[spawnName].energy >= 300 && creep.withdraw(spawn, RESOURCE_ENERGY, 50) == ERR_NOT_IN_RANGE) {
            	creep.moveTo(spawn.pos, {visualizePathStyle: {stroke: '#ffaa00'}});
            	creep.memory.upgrading = true;
            } else {
				var targetSource = Game.getObjectById(sourceSwitch.getSource(creep));
				if(creep.harvest(targetSource) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targetSource, {visualizePathStyle: {stroke: '#ffaa00'}});
				}
			}
        }
	},
	
    spawn: function(spawnName, maxUpgraders, roomSize, y, z) {
	    var roleTxt = 'upgrader';
        var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == roleTxt);
	    if(upgrader.length < maxUpgraders) {
            var newName = 'Upgrader' + Game.time;
			console.log("spawning " + newName);
            Game.spawns[spawnName].spawnCreep(global.bodyUpgraders[roomSize], newName, {memory: {role: roleTxt}});
        }
	}
};

module.exports = roleUpgrader;

