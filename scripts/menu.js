Events.on(ClientLoadEvent, () => {
    
    const dialog = new BaseDialog("Hackustry");
    dialog.addCloseButton();
    
    dialog.cont.check("test", Core.settings.getBool("checkbox-test"), e => {
        Core.settings.put("checkbox-test", e);
        Vars.ui.showText("asdf", e.toString());
    });
    
    dialog.buttons.button("Turn off all features", () => {
        Core.app.exit();
    }).size(210, 64);
    
    Vars.ui.settings.shown(() => {
        Vars.ui.settings.children.get(1).children.get(0).children.get(0).row();
        Vars.ui.settings.children.get(1).children.get(0).children.get(0).button("Hackustry", () => {
            dialog.show();
            Vars.ui.settings.hide();
        });
    });
});
