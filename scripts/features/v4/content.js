importPackage(Packages.arc.util.async);

function content(){
    const dialog = new BaseDialog("content");
    dialog.addCloseButton();
    
    dialog.cont.center().pane(p => {
        p.defaults().size(210, 64);
        
        let i = 0;
        Vars.content.each(e => {
            if(!(e instanceof UnlockableContent)) return;
            p.button(e.localizedName, new TextureRegionDrawable(e.icon(Cicon.medium)), () => {
                const content = new BaseDialog(e.name);
                content.addCloseButton();
                
                let c = content.cont;
                c.defaults().center();
                c.image(e.icon(Cicon.full));
                c.row();
                c.label(() => {
                    let n = e.class.name.includes("$") ? e.class.superclass.name : e.class.name;
                    return e.localizedName + " (type: " + n.substring(n.lastIndexOf(".") + 1, n.length) + ")";
                });
                c.row();
                c.button("unlock", Icon.lockOpen, () => {
                    e.quietUnlock();
                    content.hide();
                }).size(210, 64);
                c.row();
                c.button("unlock temporarily", Icon.lockOpen, () => {
                    e.alwaysUnlocked = true;
                    content.hide();
                }).size(210, 64);
                c.row();
                c.button("lock", Icon.lock, () => {
                    e.clearUnlock();
                    content.hide();
                }).size(210, 64);
                c.row();
                
                if(e instanceof Block){
                    c.button("build visibility", Icon.eye, () => {
                        const bv = new BaseDialog("build visibility");
                        bv.addCloseButton();
                        
                        Object.keys(BuildVisibility).forEach(b => {
                            if(BuildVisibility[b] instanceof Function) return;
                            bv.cont.button(b, () => {
                                e.buildVisibility = BuildVisibility[b];
                                bv.hide();
                            }).size(210, 64);
                            bv.cont.row();
                        });
                        
                        bv.show();
                    }).size(210, 64);
                    c.row();
                }
                
                c.button("more", Icon.add, () => {
                    const stats = new BaseDialog("stats");
                    stats.addCloseButton();
                    
                    stats.cont.center().pane(pane => {
                        Threads.daemon(() => {
                            let i2 = 0;
                            Object.keys(e).forEach(s => {
                                if(e[s] === undefined) return;
                                if(typeof e[s] === "object") return;
                                if(typeof e[s] === "function") return;
                                
                                pane.button(s, () => {
                                    Vars.ui.showTextInput("enter value (" + typeof e[s] + ")", s + ":", 128, "", false, v => {
                                        let value = v;
                                        if(v.match(/^true$|^false$/)) value = eval(v);
                                        try{
                                            e[s] = value;
                                        }catch(c){}
                                    });
                                    stats.hide();
                                }).size(210, 64);
                                i2++
                                if(!(i2 % 2)) pane.row();
                            });
                        }).join();
                    }).growY().width(Vars.mobile ? Core.graphics.getWidth() : Core.graphics.getWidth()/3);
                    
                    stats.show();
                }).size(210, 64);
                c.row();
                
                content.show();
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
    p.button("content", () => {
        content();
        dialog.hide();
    }).left().width(210);
};
