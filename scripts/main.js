// Activate the console
Vars.enableConsole = true;

// Run the other scripts
require("content/unlock");
require("content/blocks");

// consol
Events.on(WorldLoadEvent, e => {Vars.state.rules.infiniteResources = true});
