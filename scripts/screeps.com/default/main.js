var constants = require('constant.vars');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var handleSpawn = require('spawn.scale');


module.exports.loop = function () {

	var spawnName = "Spawn1";
    handleSpawn.scale(spawnName);
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
  
/*
    var tower = Game.getObjectById('14eb13247995e5f7380a9f42');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
	*/
    if(Game.spawns[spawnName].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
        Game.spawns[spawnName].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[spawnName].pos.x + 1, 
            Game.spawns[spawnName].pos.y, 
            {align: 'left', opacity: 0.8});
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
		switch (creep.memory.role) {
			case 'harvester': 
				roleHarvester.run(creep);
				break;
			case 'upgrader':
				roleUpgrader.run(creep);
				break;
			case 'builder':
            	roleBuilder.run(creep);
				break;
			case 'repairer':
            	roleRepairer.run(creep);
				break;
		}
    }
}
