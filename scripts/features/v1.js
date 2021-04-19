const hconv = extend(Conveyor, "hackusated-conveyor", {
    localizedName: "Hackusated Conveyor",
    description: "fast conveyor go brr",
    category: Category.distribution,
    buildVisibility: BuildVisibility.hidden,
    inEditor: false,
    health: 99999,
    speed: 99999,
    alwaysUnlocked: true
});

module.exports = (add) => {
    add("hackusated-conveyor", true, t => {
        hconv.inEditor = t;
        hconv.buildVisibility = t ? BuildVisibility.shown : BuildVisibility.hidden;
    });
};
