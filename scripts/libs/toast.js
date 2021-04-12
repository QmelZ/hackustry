module.exports = function(icon, text){    
    if(!icon || !text) return;
    
    let table = new Table(Tex.button);
    table.update(() => {
        if(!Vars.ui.hudfrag.shown) table.remove();
    });
    table.margin(12);
    table.image(icon).pad(3);
    table.add(text).wrap().width(280).get().setAlignment(Align.center, Align.center);
    table.pack();
    
    let container = Core.scene.table();
    Vars.state.isMenu() ? container.top().right().add(table) : container.top().add(table);
    container.setTranslation(0, table.getPrefHeight());
    container.actions(
        Actions.translateBy(0, -table.getPrefHeight(), 1, Interp.fade),
        Actions.delay(2.5),
        Actions.run(() => container.actions(
            Actions.translateBy(0, table.getPrefHeight(), 1, Interp.fade),
            Actions.remove()
        ))
    );
}
