// Set build visibility of certain blocks to always visible
Blocks.blockForge.buildVisibility = BuildVisibility.shown;
Blocks.blockLoader.buildVisibility = BuildVisibility.shown;
Blocks.blockUnloader.buildVisibility = BuildVisibility.shown;
Blocks.itemSource.buildVisibility = BuildVisibility.shown;
Blocks.itemVoid.buildVisibility = BuildVisibility.shown;
Blocks.liquidSource.buildVisibility = BuildVisibility.shown;
Blocks.liquidVoid.buildVisibility = BuildVisibility.shown;
Blocks.powerSource.buildVisibility = BuildVisibility.shown;
Blocks.powerVoid.buildVisibility = BuildVisibility.shown;
Blocks.illuminator.buildVisibility = BuildVisibility.shown;
Blocks.scrapWall.buildVisibility = BuildVisibility.shown;
Blocks.scrapWallLarge.buildVisibility = BuildVisibility.shown;
Blocks.scrapWallHuge.buildVisibility = BuildVisibility.shown;
Blocks.scrapWallGigantic.buildVisibility = BuildVisibility.shown;

// I don't think a unit limit is needed
Blocks.coreShard.unitCapModifier = 2147483647
Blocks.coreFoundation.unitCapModifier = 2147483647
Blocks.coreNucleus.unitCapModifier = 2147483647

// Make the reconstructors instant and free
Blocks.additiveReconstructor.constructTime = 0;
Blocks.multiplicativeReconstructor.constructTime = 0;
Blocks.exponentialReconstructor.constructTime = 0;
Blocks.tetrativeReconstructor.constructTime = 0;

Blocks.additiveReconstructor.consumes.items();
Blocks.multiplicativeReconstructor.consumes.items();
Blocks.exponentialReconstructor.consumes.items();
Blocks.tetrativeReconstructor.consumes.items();
