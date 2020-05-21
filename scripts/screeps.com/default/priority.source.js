//Need to determine if source is near enemy, avoid.  Prioritize source close, and deprioritize spawns in swamp.
 var sourcePriority = {
    getPriority: function(source) {
        let priority = 0;
        let weight;
        var MAX_IN_RANGE = 5;
        /*
         reduce priority to nodes proximal to enemy(by how much?)
         reduce priority relative to distance
         retain and reduce priority to clustered nodes
         deprioritize swamp/whatever
         calculate weight
         */
        if (source.pos.findInRange(FIND_HOSTILE_CREEPS, 5)) {
            priority = 0;
        } else if (source.energy == 0) {
            priority = 0;
        } else if (source.ticksToRegeneration == undefined) {
            priority = 10;
        } else {
            priority = source.energy / source.ticksToRegeneration;
        }
        // Slightly lower for each creep in range, to reduce the burden on a single source.
        //TODO Tweak the "creep in range" value
        priority -= source.pos.findInRange(FIND_MY_CREEPS,MAX_IN_RANGE).length;
        if (priority > 0 && source.ticksToRegeneration < 150) {
            priority = priority * (1 + (150 - source.ticksToRegeneration)/250);
            if (source.ticksToRegeneration < 70) {
                priority = priority + (70 - source.ticksToRegeneration)/10;
            }
        }
        return priority;
    },

    getHighestPriority : function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        //points.sort(function(a, b){return a - b});
        //Memory.source.sort(function(a, b){});
        var highestPri;
        var highestId;
        for (var i = 0; i < sources.length; i++) {
            var thisPriority = this.getPriority(sources[i]);
            Memory.source[sources[i].id].priority = thisPriority;
            if (highestId == undefined || thisPriority > highestPri) {
                highestId = sources[i].id;
                highestPri = thisPriority;
            }
        }
        return highestId;
    },

    recalculatePriorities : function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        for (var i = 0; i < sources.length; i++) {
            Memory.source[sources[i].id].priority = this.getPriority(sources[i]);
        }
    }
};

module.exports = sourcePriority;
