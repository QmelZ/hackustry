module.exports = (add) => {
    
    // launch to any sector
    add("launch-anywhere", true, t => {
        PlanetDialog.debugSelect = t;
        Vars.content.sectors().each(e => e.alwaysUnlocked = t);
    });

    add("unit-anywhere", false, () => {
	Vars.content.units().each(e => e.envDisabled = Env.none);
    });
};
