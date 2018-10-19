/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('target.repair');
 * mod.thing == 'a thing'; // true
 */

var repairTarget = {
    find: function(creep) {
        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax
        });
        
        targets.sort((a,b) => a.hits - b.hits);
        if (targets.length > 0) {
            return targets[0].id;
        } else {
            return null;
        }
    }
}

module.exports = repairTarget;