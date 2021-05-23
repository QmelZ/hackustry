let factory = extend(UnitFactory, "unit-factory", {
    localizedName: "Unit Factory",
    category: Category.units,
    buildVisibility: BuildVisibility.hidden,
    inEditor: false,
    size: 3,
    plans: Seq.with()
});

Events.on(ContentInitEvent, () => {
    Vars.content.units().each(e => {
        if(e === UnitTypes.block) return;
        factory.plans.add(new UnitFactory.UnitPlan(e, 0, ItemStack.with()))
    });
});

factory.buildType = () => extend(UnitFactory.UnitFactoryBuild, factory, {
    shouldSpawn: false,
    _unit: null,
    updateTile(){
        if(this.spawn){
            this.spawn = false;
            
        }
    },
    buildConfiguration(table){
        let i = 0;
        Vars.content.units().each(e => {
            table.button(new TextureRegionDrawable(e.icon(Cicon.large)), () => {});
            if(!(++i % 4)) table.row();
        });
    }
});


module.exports = (add) => {
    add("unit-factory", true, t => {
        factory.inEditor = t;
        factory.buildVisibility = t ? BuildVisibility.shown : BuildVisibility.hidden;
    });
};
