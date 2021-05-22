/* 
    welcome to the start of my spaghetti code
    have fun trying to read it without dying
*/

Vars.enableConsole = true;

if(Vars.headless){
    throw "no server support yet";
}else{
const menu = require(modName + "/menu");
    let dialog;
    Events.on(ClientLoadEvent, () => {
        dialog = menu.setupDialog();
        menu.addSettings(dialog);
    });
}
