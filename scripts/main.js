/* 
    welcome to the start of my spaghetti code
    have fun trying to read it without dying
*/

Vars.enableConsole = true;

if(Vars.headless){
    throw "no server support yet";
}else{
const menu = require(modName + "/menu");
    if(Core.app.isDesktop()) rpc();
    
    let dialog;
    Events.on(ClientLoadEvent, () => {
        dialog = menu.setupDialog();
        menu.addSettings(dialog);
    });
    
}

// most pointless thing i have ever done
function rpc(){
    try{
        importPackage(Packages.club.minnced.discord.rpc);
        DiscordRPC.INSTANCE.Discord_Shutdown();
        DiscordRPC.INSTANCE.Discord_Initialize("846047005901586432", null, true, "1127400");
    }catch(c){}
}
