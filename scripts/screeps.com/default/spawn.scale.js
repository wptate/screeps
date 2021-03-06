var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

var handleSpawn = {

        
    scale: function (spawnName) {
        if (!Game.spawns[spawnName]) {
			console.log("failed to spawn from " + spawnName);
            return;
        }
        //defendSpawn(spawnName);
        
        //handle creeps
        // Need to detect spawn cost/energy available and not attempt spawn until clear
		if (Object.keys(Game.creeps).length < 4) { //start up
            //emergency!
			if (Game.spawns[spawnName].spawning == null) {
            	roleHarvester.spawn(spawnName, 4, 'small', 0, 0);
			}
        } else if (Game.spawns[spawnName].room.energyCapacityAvailable < 500) { //tiny - no extensions
            //small domestic types only
            if (Game.spawns[spawnName].spawning == null) {
            	roleHarvester.spawn(spawnName, 8, 'small', null, null);
				roleBuilder.spawn(spawnName, 3, 'small', null, null);
				roleUpgrader.spawn(spawnName, 5, 'small', null, null);
				roleRepairer.spawn(spawnName, 2, 'small', 0, null);
			}
        } else if (Game.spawns[spawnName].room.energyCapacityAvailable < 800) { //small - 5 extensions
            //small domestic types
            if (Game.spawns[spawnName].spawning == null) {
            	if (roleHarvester.spawn(spawnName, 10, 'medium', null, null) != OK)
				if (roleBuilder.spawn(spawnName, 10, 'medium', null, null) != OK)
				if (roleUpgrader.spawn(spawnName, 8, 'medium', null, null) != OK)
				if (roleRepairer.spawn(spawnName, 2, 'small', 0, null) != OK)
				//combat types
				if (roleScout.spawn(spawnName, 2, 'small') != OK)
				if (roleScavenger.spawn(spawnName, 1, 'small') != OK)
					; //DO NOTHING
			}
        } else { //medium - 10 extensions and up
            //medium domestic types
            if (Game.spawns[spawnName].spawning == null) {
            	if (roleHarvester.spawn(spawnName, 10, 'medium', null, null) != OK)
				if (roleBuilder.spawn(spawnName, 15, 'medium', null, null) != OK)
				if (roleUpgrader.spawn(spawnName, 5, 'medium', null, null) != OK)
				if (roleRepairer.spawn(spawnName, 2, 'medium', 0, null) != OK)
				//combat types
				if (roleScout.spawn(spawnName, 2, 'small') != OK)
				if (roleScavenger.spawn(spawnName, 1, 'small') != OK)
				//utility types
				if (roleSignwriter.spawn(spawnName, 1) != OK)
				if (roleClaimer.spawn(spawnName, 2) != OK)
				if (roleStoremanager.spawn(spawnName, 2) != OK)
					; //DO NOTHING
			}
        }
    }
}

module.exports = handleSpawn;