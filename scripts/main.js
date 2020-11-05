// Activate the console
Vars.enableConsole = true;

// Run the other scripts
require("content/unlock");
require("content/blocks");
require("content/turrets")

// "consol", makes a lot of sense. :D
Events.on(WorldLoadEvent, e => {Vars.state.rules.infiniteResources = true});
