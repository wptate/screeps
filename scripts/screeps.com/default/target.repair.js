

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