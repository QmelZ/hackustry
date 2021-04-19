const toast = require(modName + "/libs/toast");

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

function load(f){
    require(modName + "/features/" + f)(add);
}

load("v1");
// load("v2");
load("v3");


// if the feature is on it should stay on
Events.on(ClientLoadEvent, () => {
    let runt = (f) => features[f].func(true);
    for(let f in features){
        if(util.get(f)) runt(f);
    }
});
