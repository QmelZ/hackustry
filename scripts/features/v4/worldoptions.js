function worldoptions(){
    const dialog = new BaseDialog("world options");
    dialog.addCloseButton();
    
    dialog.cont.center().pane(p => {
        p.defaults().height(36);
        
        function check(name, option){
            if(!name || typeof name !== "string") return;
            if(!option || typeof option !== "string") return;
            if(typeof Vars.state.rules[option] !== "boolean") return;
            
            p.check(name, Vars.state.rules[option], () => {
                Vars.state.rules[option] = !Vars.state.rules[option];
            }).left();
            p.row();
        }
        
        check("sandbox mode", "infiniteResources");
        check("wave timer", "waveTimer");
        check("waves", "waves");
        check("waves wait for enemies", "waitEnemies");
        check("editor", "editor");
        check("can game over", "canGameOver");
        check("reactor explosions", "reactorExplosions");
        check("schematics", "schematicsAllowed");
        check("fire", "fire");
        check("units require ammo", "unitAmmo");
        check("unit building with logic", "logicUnitBuild");
        check("lighting", "lighting");
        check("enemy lights", "enemyLights");
        check("core incinerates", "coreIncinerates");
        
        p.table(cons(t => {
            t.label(() => "unit cap:");
            t.field(Vars.state.rules.unitCap, TextField.TextFieldFilter.digitsOnly, s => {
                if(s === "") return;
                if(parseInt(s) > Integer.MAX_VALUE) return;
                
                Vars.state.rules.unitCapVariable = parseInt(s) === 0;
                Vars.state.rules.unitCap = parseInt(s);
            });
        }));
        p.row();
        
    }).growY().width(Vars.mobile ? Core.graphics.getWidth() : Core.graphics.getWidth()/3);
    
    dialog.show();
}

module.exports = (p, dialog) => {
    p.button("world options", () => {
        worldoptions();
        dialog.hide();
    }).self(s => {
        s.get().setDisabled(() => {
            if(Vars.state.is(GameState.State.menu)) return true;
            if(Vars.net.client()) return true;
            return false;
        });
    }).left().width(210);
};
