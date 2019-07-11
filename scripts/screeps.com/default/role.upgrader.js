var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0 && Game.spawns['Spawn1'].energy >= 300) {
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
            var spawn = Game.spawns['Spawn1'];
            if(creep.withdraw(spawn, RESOURCE_ENERGY, 50) == ERR_NOT_IN_RANGE) {
              creep.moveTo(spawn.pos, {visualizePathStyle: {stroke: '#ffaa00'}});
            	creep.memory.upgrading = true;
            }
        }
	},
	
    spawn: function(spawnName, maxUpgraders, roomSize, y, z) {
	    var roleTxt = 'upgrader';
        var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == roleTxt);
	    if(upgrader.length < maxUpgraders) {
            var newName = 'Upgrader' + Game.time;
            Game.spawns[spawnName].spawnCreep(global.bodyUpgraders[roomSize], newName, {memory: {role: roleTxt}});
        }
	}
};

module.exports = roleUpgrader;

