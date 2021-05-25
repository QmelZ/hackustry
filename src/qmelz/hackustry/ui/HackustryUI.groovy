package qmelz.hackustry.ui

import arc.ApplicationListener
import arc.Core
import arc.graphics.g2d.Draw
import arc.math.Interp
import arc.scene.actions.Actions
import arc.scene.style.Drawable
import arc.scene.ui.layout.Table
import arc.util.Align
import mindustry.Vars
import mindustry.gen.Icon
import mindustry.gen.Tex
import qmelz.hackustry.ui.dialogs.HackustryDialog


class HackustryUI implements ApplicationListener{
    def main, content, world, transform;
    
    @Override
    void init(){
        main = new HackustryDialog();
    }
    
    // stolen from my toast lib lmao
    static void showToast(Drawable icon, String text){
        def table = new Table(Tex.button);
        table.update{
            if(!Vars.ui.hudfrag.shown) table.remove();
        }
        table.margin(12);
        table.image(icon).pad(3);
        table.add(text).wrap().width(280).get().setAlignment(Align.center, Align.center);
        table.pack();
    
        def container = Core.scene.table();
        Vars.state.isMenu() ? container.top().right().add(table) : container.top().add(table);
        container.setTranslation(0, table.getPrefHeight());
        container.actions(
            Actions.translateBy(0, -table.getPrefHeight(), 1, Interp.fade),
            Actions.delay(2.5),
            Actions.run{
                container.actions(
                    Actions.translateBy(0, table.getPrefHeight(), 1, Interp.fade),
                    Actions.remove()
                )
            }
        );
    }
}
