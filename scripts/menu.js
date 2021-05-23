const features = require(modName + "/features/features");
let toast = require(modName + "/libs/toast");

let loadf = (name) => require(modName + "/features/v4/" + name);
const menus = [
    loadf("worldoptions"),
    loadf("content"),
    loadf("transform"),
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
        })).height(48);
        p.row();
        p.table(cons(t => {
            menus[2](t, dialog);
        })).height(48);
        p.row();
        
        
        function add(name, displayName){
            if(!name || typeof name !== "string") return;
            if(!displayName || typeof displayName !== "string") displayName = name;
            
            p.check(displayName, features.get(name), () => {
                features.runf(name);
            }).left();
            p.row();
        }
        
        add("reconstructors", "make reconstructors cost nothing and instant");
        add("power-sources", "fix vanilla power sources");
        add("cursed-mode", "cursed mode");
        add("op-turrets", "op turrets");
        add("hackusated-conveyor", "hackusated conveyor");
        add("hackusated-walls", "hackusated walls");
        add("unit-factory", "unit factory");
        
    }).growY().width(Vars.mobile ? Core.graphics.getWidth() : Core.graphics.getWidth()/3);
    
    dialog.buttons.button("more", Icon.add, () => more()).size(210, 64);
    
    if(Vars.mobile) dialog.buttons.button(Icon.terminal, () => Vars.ui.scriptfrag.toggle()).size(64);
    
    return dialog;
}

function more(){
    const dialog = new BaseDialog("more");
    dialog.addCloseButton();
    
    dialog.cont.center().pane(p => {
        p.defaults().size(210, 64);
        
        p.button("Disable all features", Icon.cancel, () => {
            const flist = features.features();
            for(let f in flist){
                if(features.get(f)) features.runf(f);
            }
            Vars.ui.showInfo("The game will now close to disable all features");
            Core.scene.dialog.hidden(() => Core.app.exit());
        });
        p.row();
        
        let no = () => toast(Icon.info, "not yet implemented");
        
        p.button("Export settings as json", () => no());
        p.row();
        
        p.button("Import settings as json", () => no());
        p.row();
        
        p.button("Accounts", Icon.players, () => no());
        p.row();
        
    }).growY().width(Vars.mobile ? Core.graphics.getWidth() : Core.graphics.getWidth()/3);
    
    dialog.show();
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
