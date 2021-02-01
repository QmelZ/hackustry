// obligatory comment here
Events.on(ClientLoadEvent, b => {
    Vars.ui.showCustomConfirm(
        "[]Enable [#8f00ff]Hackustry[] Cursed Mode?[]",
        "[#8f00ff]Hackustry[] cursed mode makes all blocks 1x1 or 2x2 for making zipped schematics, but it effectively ruins all vanilla schematics.\n[accent]Do you want to enable cursed mode?[]",
        "No",
        "Yes",
        ()=>{
            print("[accent]Cursed mode not enabled[]");
        },
        ()=>{
            Vars.content.blocks().each(e => {
                if(e.size === 3 ) e.size = 1;
                if(e.size === 4 ) e.size = 2;
            });
            Blocks.coreShard.size = 3;
            Blocks.coreFoundation.size = 4;
        }
    );
});
