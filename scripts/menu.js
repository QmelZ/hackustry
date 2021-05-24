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
            menus[0](t);
            menus[1](t);
        })).height(48);
        p.row();
        p.table(cons(t => {
            menus[2](t);
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
        add("launch-anywhere", "launch anywhere");
        
    }).growY().width(Vars.mobile ? Core.graphics.getWidth() : Core.graphics.getWidth()/3);
    
    dialog.buttons.button("more", Icon.add, () => more()).size(210, 64);
    
    if(Vars.mobile) dialog.buttons.button(Icon.terminal, () => Vars.ui.scriptfrag.toggle()).size(64);
    
    return dialog;
}

function more(){
    const dialog = new BaseDialog("More");
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
        
        p.button("Import/Export", () => {
            const dialog = new BaseDialog("Import/Export");
            dialog.addCloseButton();
            
            dialog.cont.center().pane(pane => {
                pane.defaults().size(210, 64);
                
                let includeContent = false;
                
                pane.check("include content", false, b => includeContent = b);
                pane.row();
                
                pane.button("Import", () => data(false, includeContent));
                pane.row();
                
                pane.button("Export", () => data(true, includeContent));
                pane.row();
                
            }).growY().width(Vars.mobile ? Core.graphics.getWidth() : Core.graphics.getWidth()/3);
            
            dialog.show();
        });
        p.row();
        
        p.button("Accounts", Icon.players, () => toast(Icon.info, "not implemented yet"));
        p.row();
        
    }).growY().width(Vars.mobile ? Core.graphics.getWidth() : Core.graphics.getWidth()/3);
    
    dialog.show();
}

function data(isExport, unlocks){
    if(typeof isExport !== "boolean") return;
    if(typeof unlocks !== "boolean") return;
    
    if(isExport){
        Vars.ui.loadfrag.show();
        
        let obj = {
            features: {},
            content: {}
        };
        
        for(let f in features.features()){
            obj.features[f] = features.get(f);
        }
        
        if(unlocks){
            Vars.content.each(e => {
                if(!(e instanceof UnlockableContent)) return;
                
                obj.content[e.name] = [e.alwaysUnlocked, e.unlockedNow()];
            });
        }
        
        let json = JSON.stringify(obj, null, 4);
        
        Vars.ui.loadfrag.hide();
        
        writeFile("export config", "json", json);
    }else{
        readFile("import config", "json", json => {
            Vars.ui.loadfrag.show();
            
            let obj;
            try{
                obj = JSON.parse(json);
            }catch(c){
                Vars.ui.loadfrag.hide();
                Vars.ui.showErrorMessage("failed to parse json file");
                return;
            }
            
            let proto = (e) => Object.getPrototypeOf(e);
            if(proto(obj.features) !== proto({}) || proto(obj.content) !== proto({})){
                Vars.ui.loadfrag.hide();
                Vars.ui.showErrorMessage("not a valid hackustry config");
                return;
            }
            
            for(let f in obj.features){
                if(obj.features[f] === features.get(f)) continue;
                features.runf(f);
            }
            
            if(unlocks){
                Vars.content.each(e => {
                    if(!(e instanceof UnlockableContent)) return;
                    if(obj.content[e.name] === undefined) return;
                    
                    e.alwaysUnlocked = obj.content[e.name][0];
                    obj.content[e.name][1] ? e.quietUnlock() : e.clearUnlock();
                });
            }
            
            Vars.ui.loadfrag.hide();
            toast(Icon.check, "import successful");
        });
    }
}

importPackage(Packages.arc.util.serialization);
function randomUUID(){
    try{
        let number = parseInt(Mathf.random(99999999)).toString();
        number = "0".repeat(8 - number.length) + number;
        
        return Base64Coder.encodeString(number);
    }catch(c){
        return randomUUID();
    }
}

function isValid(uuid){
    if(uuid.match(/^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/)) return true;
    return false;
}

function accounts(){
    let accArray = [].concat(
        Core.settings.getJson(
            modName + ".account-list",
            Class.forName("[Ljava.lang.Object;"),
            () => [{name: Core.settings.getString("name"), uuid: Core.settings.getString("uuid")}]
        )
    );
    
    const dialog = new BaseDialog("Accounts");
    dialog.addCloseButton();
    
    dialog.cont.center().pane(p => {
        p.defaults().size(210, 64);
        
        accArray.forEach(e => {
            p.button(e.name, () => {
                Core.settings.put("name", e.name);
                Core.settings.put("uuid", e.uuid);
            }).self(s => s.get().setDisabled(() => Core.settings.getString("uuid") === e.uuid));
            p.row();
        });
        
    }).growY().width(Vars.mobile ? Core.graphics.getWidth() : Core.graphics.getWidth()/3);
    
    dialog.buttons.button("Add Account", Icon.add, () => {
        
    });
    
    dialog.hidden(() => Core.settings.putJson(modName + ".account-list", accArray));
    
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
