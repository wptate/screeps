var constants = require('constant.vars');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var handleSpawn = require('spawn.scale');

/*
var maxHarvesters = 10;
var maxUpgraders = 1;
var maxBuilders = 2;
var maxRepairers = 1;

var bodyHarvesters = [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
var bodyUpgraders = [WORK,CARRY,MOVE];
var bodyBuilders = [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
var bodyRepairers = [WORK,CARRY,MOVE];
*/

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
  /*
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if(harvesters.length < maxHarvesters) {
        var newName = 'Harvester' + Game.time;
        Game.spawns[spawnName].spawnCreep(bodyHarvesters, newName, 
            {memory: {role: 'harvester'}});
    }
    
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

    if(upgraders.length < maxUpgraders && 
        Game.spawns[spawnName].room.energyAvailable > (bodyUpgraders.length * 50 * 2) &&
        (maxHarvesters - harvesters.length) <= (maxHarvesters / 2)) {
        var newName = 'Upgrader' + Game.time;
        Game.spawns[spawnName].spawnCreep(bodyUpgraders, newName, 
            {memory: {role: 'upgrader'}});
    }
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    if(builders.length < maxBuilders && 
        Game.spawns[spawnName].room.energyAvailable > (bodyBuilders.length * 50 * 1.5) && 
        (maxHarvesters - harvesters.length) <= (maxHarvesters / 2)) {
        var newName = 'Builder' + Game.time;
        Game.spawns[spawnName].spawnCreep(bodyBuilders, newName, 
            {memory: {role: 'builder'}});
    }
    
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');

    if(repairers.length < maxRepairers && 
        Game.spawns[spawnName].room.energyAvailable > (bodyRepairers.length * 50 * 2) &&
        (maxHarvesters - harvesters.length) <= (maxHarvesters / 2)) {
        var newName = 'Repairer' + Game.time;
        Game.spawns[spawnName].spawnCreep(bodyRepairers, newName, 
            {memory: {role: 'repairer'}});
    }*/
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
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }
}
