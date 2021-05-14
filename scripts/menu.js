const features = require(modName + "/features/features");
let loadf = (name) => require(modName + "/features/v4/" + name);
const menus = [
    loadf("worldoptions"),
    loadf("content"),
];

function setupDialog(){
    const dialog = new BaseDialog("Hackustry");
    dialog.addCloseButton();
    
    // this is P A I N
    dialog.cont.center().pane(p => {
        p.defaults().height(36);
        
        p.table(cons(t => {
            menus[0](t, dialog);
            menus[1](t, dialog);
        })).height(36);
        p.row();
        
        function add(name, displayName){
            if(!name || typeof name !== "string") return;
            if(!displayName || typeof displayName !== "string") displayName = name;
            
            p.check(displayName, features.get(name), () => {
                features.runf(name);
            }).left();
            p.row();
        }
        
        add("build-visibility", "make all blocks visible");
        add("reconstructors", "make reconstructors cost nothing and instant");
        add("unit-cap", "99999 unit cap for all cores");
        add("power-sources", "fix vanilla power sources");
        add("cursed-mode", "cursed mode");
        add("op-turrets", "op turrets");
        add("hackusated-conveyor", "hackusated conveyor");
        
    }).growY().width(Vars.mobile ? Core.graphics.getWidth() : Core.graphics.getWidth()/3);
    
    dialog.buttons.button("Disable all features", () => {
        const flist = features.features();
        for(let f in flist){
            if(features.get(f)) features.runf(f);
        }
        Core.app.exit();
    }).size(210, 64);
    
    if(Vars.mobile) dialog.buttons.button(Icon.terminal, () => Vars.ui.scriptfrag.toggle()).size(64);
    
    return dialog;
}

function addSettings(dialog){
    Vars.ui.settings.shown(() => {
        Vars.ui.settings.children.get(1).children.get(0).children.get(0).row();
        Vars.ui.settings.children.get(1).children.get(0).children.get(0).button("Hackustry", Styles.cleart, () => {
            dialog.show();
            Vars.ui.settings.hide();
        });
    });
}

module.exports = {
    setupDialog: setupDialog,
    addSettings: addSettings
};
