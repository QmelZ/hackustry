function unlock(){
    const dialog = new BaseDialog("unlock");
    dialog.addCloseButton();
    
    dialog.cont.center().pane(p => {
        p.defaults().size(210, 64);
        
        let i = 0;
        Vars.content.each(e => {
            if(!(e instanceof UnlockableContent)) return;
            p.button(e.localizedName, new TextureRegionDrawable(e.icon(Cicon.small)), () => {
                const unlock = new BaseDialog(e.name);
                unlock.addCloseButton();
                
                let c = unlock.cont;
                c.defaults().center();
                c.image(e.icon(Cicon.medium));
                c.row();
                c.label(() => {
                    let n = e.class.name.includes("$") ? e.class.superclass.name : e.class.name;
                    return e.localizedName + " (type: " + n.substring(n.lastIndexOf(".") + 1, n.length) + ")";
                });
                c.row();
                c.button("unlock", () => {
                    e.quietUnlock();
                    unlock.hide();
                }).size(210, 64);
                c.row();
                c.button("unlock temporarily", () => {
                    e.alwaysUnlocked = true;
                    unlock.hide();
                }).size(210, 64);
                c.row();
                c.button("lock", () => {
                    e.clearUnlock();
                    unlock.hide();
                }).size(210, 64);
                
                unlock.show();
            });
            i++;
            if(!(i % 2)) p.row();
        });
    }).growY().width(Vars.mobile ? Core.graphics.getWidth() : Core.graphics.getWidth()/3);
    
    dialog.buttons.button("more", Icon.add, () => {
        const more = new BaseDialog("more");
        more.addCloseButton();
        
        let c = more.cont;
        c.defaults().size(210, 64);
        c.button("unlock all", () => {
            Vars.content.each(e => {
                if(!(e instanceof UnlockableContent)) return;
                e.quietUnlock();
            });
            more.hide();
        });
        c.row();
        c.button("temporarily unlock all", () => {
            Vars.content.each(e => {
                if(!(e instanceof UnlockableContent)) return;
                e.alwaysUnlocked = true;
            });
            more.hide();
        });
        c.row();
        c.button("lock all", () => {
            Vars.content.each(e => {
                if(!(e instanceof UnlockableContent)) return;
                e.clearUnlock();
            });
            more.hide();
        });
       
        more.show();
    });
    
    dialog.show();
}

module.exports = (p, dialog) => {
    p.button("unlock", () => {
        unlock();
        dialog.hide();
    }).left().width(210);
};
