const toast = require("libs/toast");
const annoying = require("annoying");

const features = {};

const util = {
    features(){
        return features;
    },
    get(name){
        if(!name || typeof name !== "string") return;
        
        return Core.settings.getBool(name);
    },
    runf(name){
        if(!name || typeof name !== "string") return;
        
        let enabled = !Core.settings.getBool(name);
        Core.settings.put(name, enabled);
        features[name].func(enabled);
        if(!enabled && !features[name].toggle){
            annoying.start();
        }
    }
};
module.exports = util;

function add(name, toggle, func){
    if(!name || typeof name !== "string") return;
    if(typeof toggle !== "boolean") return;
    if(!func || typeof func !== "function") return;
    
    features[name] = {
        func: func,
        toggle: toggle
    };
}

// visible all blocks
// TODO(?) add something to make floors etc not visible
add("build-visibility", false, () => {
    Vars.content.blocks().each(e => {
        e.buildVisibility = BuildVisibility.shown;
    });
});

// reconstructors take no items and instant
add("reconstructors", false, () => {
    Vars.content.blocks().each(e => {
        if(!(e instanceof Reconstructor)) return;
        
        e.constructTime = 0;
        e.consumes.items();
    });
});

// increase unit cap
// this broke stuff when i tried to use integer limit in v3, so 99999 it is
add("unit-cap", false, () => {
    Vars.content.blocks().each(e => {
        if(!(e instanceof CoreBlock)) return;
        
        e.unitCapModifier = 99999;
    });
});

// fixes the built in power source to give infinite power
add("power-sources", true, s => {
    Blocks.powerSource.powerProduction = s ? Infinity : 1000000 / 60;
});

add("cursed-mode", true, s => {
    Vars.content.blocks().each(e => {
        if(e instanceof CoreBlock) return;
        
        if(s){
            if(e.size <= 2) return;
            e.size -= 2;
        }else{
            if(e.size > 14) return;
            e.size += 2;
        }
    });
});

add("op-turrets", false, () => {
    
});


// if the feature is on it should stay on
Events.on(ClientLoadEvent, () => {
    let runt = (f) => features[f].func(true);
    for(let f in features){
        if(util.get(f)) runt(f);
    }
});
