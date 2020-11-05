// Unlock EVERYTHING
["blocks", "items", "liquids", "units", "sectors"].forEach((contentType) => {
  Vars.content[contentType].each((thing) => (thing.alwaysUnlocked = true));
});
