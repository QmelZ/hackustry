//helper function
function modifyBlocks(blocks, property, value) {
  blocks.forEach((block) => (Blocks[block][property] = value));
}

// Set build visibility of certain blocks to always visible
modifyBlocks(
  [
    "blockForge",
    "blockLoader",
    "blockUnloader",
    "itemSource",
    "itemVoid",
    "liquidSource",
    "liquidVoid",
    "powerSource",
    "powerVoid",
    "illuminator",
  ],
  "buildVisibility",
  BuildVisibility.shown
);

// I don't think a unit limit is needed
modifyBlocks(
  ["coreShard", "coreFoundation", "coreNucleus"],
  "unitCapModifier",
  2147483647
);

// Make the reconstructors instant and free
const reconstructors = [
  "additiveReconstructor",
  "multiplicativeReconstructor",
  "exponentialReconstructor",
  "tetrativeReconstructor",
];
modifyBlocks(reconstructors, "constructTime", 0);
reconstructors.forEach((i) => Blocks[i].consumes.items());
