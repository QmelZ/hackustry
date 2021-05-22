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
    spawn: false,
    updateTile(){
        if(this.spawn){
            this.spawn = false;
            this.super$updateTile();
        }
    },
    buildConfiguration(table){
        let units = this.block.plans.copy().map(e => e.unit);
        ItemSelection.buildTable(
            table, units,
            () => this.currentPlan === -1 ? null : this.block.plans.get(currentPlan).unit,
            unit => this.configure(new Integer(this.block.plans.indexOf(u => u.unit === unit)))
        );
        
        table.row();
        table.button("spawn", Styles.cleart, () => this.spawn = true).size(160, 40);
    }
});


module.exports = (add) => {
    add("unit-factory", true, t => {
        factory.inEditor = t;
        factory.buildVisibility = t ? BuildVisibility.shown : BuildVisibility.hidden;
    });
};
