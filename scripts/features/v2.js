const mender = extend(MendProjector, "hackusated-mender", {
    localizedName: "Hackusated Mender",
    category: Category.effect,
    buildVisibility: BuildVisibility.hidden,
    inEditor: false
});

const od = extend(OverdriveProjector, "hackusated-overdrive", {
    localizedName: "Hackusated Overdrive",
    category: Category.effect,
    buildVisibility: BuildVisibility.hidden,
    inEditor: false
});

module.exports = (add) => {
    add("hackusated-mender", true, t => {
        mender.inEditor = t;
        mender.buildVisibility = t ? BuildVisibility.shown : BuildVisibility.hidden;
    });
    
    add("hackusated-overdrive", true, t => {
        od.inEditor = t;
        od.buildVisibility = t ? BuildVisibility.shown : BuildVisibility.hidden;
    });
};
