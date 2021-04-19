const toast = require("libs/toast");

// feature functions and enabling/disabling
const features = {};
let restart = false;

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
        if(!features[name].toggle){
            if(!restart && !enabled){
                restart = true;
                Core.scene.dialog.hidden(() => {
                    toast(Icon.warning, "[red]some features need a game restart to be disabled[]");
                });
            }
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
add("build-visibility", false, () => {
    Vars.content.blocks().each(e => {
        if(e instanceof Floor) return;
        if(e instanceof Cliff) return;
        if(e instanceof Boulder) return;
        if(e instanceof StaticTree) return;
        
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
    Vars.content.blocks().each(e => {
        if(e.minfo.mod) return;
        if(!(e instanceof Turret)) return;
        e.reloadTime = 0;
        e.spread = 0;
        e.inaccuracy = 0;
        e.recoilAmount = 0;
        e.restitution = 0;
        e.xRand = 0;
        e.cooldown = 10;
        e.rotateSpeed = 2147483647;
        e.targetGround = true;
        e.targetAir = true;
        
        if(!(e instanceof PowerTurret)) return;
        e.chargeTime = 144;
        e.chargeMaxDelay = 0;
        e.shootType.collidesGround = true;
        e.shootType.collidesAir = true;
        
        if(!(e instanceof LaserTurret)) return;
        e.range = 999;
        e.shootDuration = 999;
        e.shootType.length = 999;
    });
});

add("unlock", false, () => {
    Vars.content.each(e => {
        if(!(e instanceof UnlockableContent)) return;
        e.quietUnlock();
    });
});


// if the feature is on it should stay on
Events.on(ClientLoadEvent, () => {
    let runt = (f) => features[f].func(true);
    for(let f in features){
        if(util.get(f)) runt(f);
    }
});
