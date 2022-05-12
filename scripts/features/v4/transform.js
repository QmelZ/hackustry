function become(u){
    if(!(u instanceof UnitType)) return;
    
    let c = Vars.player.unit();
    Vars.player.unit(u.spawn(c.team, c.x, c.y));
    c.remove();
}

function transform(){
    const dialog = new BaseDialog("transform");
    dialog.addCloseButton();
    
    dialog.cont.center().pane(p => {
        p.defaults().size(210, 64);
        
        let i = 0;
        Vars.content.units().each(e => {
            if(e === UnitTypes.block) return;
            
            p.button(e.localizedName,
		     new TextureRegionDrawable(e.uiIcon),
		     () => {
                become(e);
                dialog.hide();
            });
            i++;
            if(!(i % 2)) p.row();
        });
        
    }).growY().width(Vars.mobile ? Core.graphics.getWidth() : Core.graphics.getWidth()/3);
    
    dialog.show();
}

module.exports = (p) => {
    p.button("transform", () => {
        transform();
    }).self(s => {
        s.get().setDisabled(() => {
            if(Vars.state.is(GameState.State.menu)) return true;
            if(Vars.net.active()) return true;
            return false;
        });
    }).left().width(210);
};
