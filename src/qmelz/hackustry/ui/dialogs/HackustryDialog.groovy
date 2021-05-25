package qmelz.hackustry.ui.dialogs

import arc.Core
import mindustry.Vars
import mindustry.ui.dialogs.BaseDialog
import qmelz.hackustry.types.Feature


class HackustryDialog extends BaseDialog{
    HackustryDialog(){
        super("Hackustry");
        
        addCloseButton();
        setup();
    }
    
    void setup(){
        this.cont.pane({p ->
            p.defaults().left().height(36);
            
            def add = {Feature f ->
                p.check
            }
        }).growY().width(Core.graphics.getWidth() / (Vars.mobile ? 0 : 3));
    }
}
