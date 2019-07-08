var constants = require('constant.vars');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var handleSpawn = require('spawn.scale');

var maxHarvesters = 10;
var maxUpgraders = 1;
var maxBuilders = 2;
var maxRepairers = 1;

var bodyHarvesters = [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
var bodyUpgraders = [WORK,CARRY,MOVE];
var bodyBuilders = [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
var bodyRepairers = [WORK,CARRY,MOVE];

module.exports.loop = function () {

    handleSpawn.scale('Spawn1');
    
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
  
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    //console.log("harv" + harvesters.length);
    if(harvesters.length < maxHarvesters) {
        var newName = 'Harvester' + Game.time;
        Game.spawns['Spawn1'].spawnCreep(bodyHarvesters, newName, 
            {memory: {role: 'harvester'}});
    }
    
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

    if(upgraders.length < maxUpgraders && 
        Game.spawns['Spawn1'].room.energyAvailable > (bodyUpgraders.length * 50 * 2) &&
        (maxHarvesters - harvesters.length) <= (maxHarvesters / 2)) {
        var newName = 'Upgrader' + Game.time;
        Game.spawns['Spawn1'].spawnCreep(bodyUpgraders, newName, 
            {memory: {role: 'upgrader'}});
    }
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    if(builders.length < maxBuilders && 
        Game.spawns['Spawn1'].room.energyAvailable > (bodyBuilders.length * 50 * 1.5) && 
        (maxHarvesters - harvesters.length) <= (maxHarvesters / 2)) {
        var newName = 'Builder' + Game.time;
        Game.spawns['Spawn1'].spawnCreep(bodyBuilders, newName, 
            {memory: {role: 'builder'}});
    }
    
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');

    if(repairers.length < maxRepairers && 
        Game.spawns['Spawn1'].room.energyAvailable > (bodyRepairers.length * 50 * 2) &&
        (maxHarvesters - harvesters.length) <= (maxHarvesters / 2)) {
        var newName = 'Repairer' + Game.time;
        Game.spawns['Spawn1'].spawnCreep(bodyRepairers, newName, 
            {memory: {role: 'repairer'}});
    }
  */ 
/* 
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
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
    }*/
}
