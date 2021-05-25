module.exports = (add) => {
    
    // launch to any sector
    add("launch-anywhere", true, t => {
        PlanetDialog.debugSelect = t;
        Vars.content.sectors().each(e => e.alwaysUnlocked = t);
    });
};
