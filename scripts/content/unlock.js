// Unlock EVERYTHING
Vars.content.blocks().each(e => e.alwaysUnlocked = true);
Vars.content.items().each(e => e.alwaysUnlocked = true);
Vars.content.liquids().each(e => e.alwaysUnlocked = true);
Vars.content.units().each(e => e.alwaysUnlocked = true);
Vars.content.sectors().each(e => e.alwaysUnlocked = true);
