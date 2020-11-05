// Activate the console
Vars.enableConsole = true;

// Run the other scripts
require("content/unlock");
require("content/blocks");
require("content/turrets");

// Enable infniteResources upon a map load
Events.on(WorldLoadEvent, e => {Vars.state.rules.infiniteResources = true});
