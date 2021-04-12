/* 
    welcome to the start of my spaghetti code
    have fun trying to read it without dying
*/

Vars.enableConsole = true;

const menu = require("menu");
let dialog;
Events.on(ClientLoadEvent, () => {
    dialog = menu.setupDialog();
    menu.addSettings(dialog);
});
