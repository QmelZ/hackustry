// Set build visibility of all blocks to always visible
Vars.content.blocks().each(e => e.buildVisibility = BuildVisibility.shown);

// Make the reconstructors instant and free
Blocks.additiveReconstructor.constructTime = 0;
Blocks.multiplicativeReconstructor.constructTime = 0;
Blocks.exponentialReconstructor.constructTime = 0;
Blocks.tetrativeReconstructor.constructTime = 0;

Blocks.additiveReconstructor.consumes.items();
Blocks.multiplicativeReconstructor.consumes.items();
Blocks.exponentialReconstructor.consumes.items();
Blocks.tetrativeReconstructor.consumes.items();
