importPackage(java.lang);

const wallbuild = {
    updateTile(){
        this.super$updateTile();
        this.health = this.maxHealth;
    },
    
    collision: () => true,
    
    no(){
        this.dead = false;
        this.health = this.maxHealth;
    },
    kill(){
        this.no();
    },
    killed(){
        this.no();
    },
    remove(){
        this.no();
    },
    damage(){
        this.no();
    }
};

let wall, largewall;

Events.on(ContentInitEvent, () => {
    wall = extend(Wall, "hackusated-wall", {
        localizedName: "Hackusated Wall",
        category: Category.defense,
        buildVisibility: BuildVisibility.hidden,
        inEditor: false,
        size: 1,
        
        health: Integer.MAX_VALUE
    });
    wall.buildType = () => extend(Wall.WallBuild, wall, wallbuild);

    largewall = extend(Wall, "hackusated-wall-large", {
        localizedName: "Large Hackusated Wall",
        category: Category.defense,
        buildVisibility: BuildVisibility.hidden,
        inEditor: false,
        size: 2,
        
        health: Integer.MAX_VALUE
    });
    largewall.buildType = () => extend(Wall.WallBuild, largewall, wallbuild);
});

/*
const mender = extend(MendProjector, "hackusated-mender", {
    localizedName: "Hackusated Mender",
    category: Category.effect,
    buildVisibility: BuildVisibility.hidden,
    inEditor: false,
    size: 2    
});

const od = extend(OverdriveProjector, "hackusated-overdrive", {
    localizedName: "Hackusated Overdrive",
    category: Category.effect,
    buildVisibility: BuildVisibility.hidden,
    inEditor: false,
    size: 2
});
*/

module.exports = (add) => {
    add("hackusated-walls", true, t => {
        wall.inEditor = t;
        wall.buildVisibility = t ? BuildVisibility.shown : BuildVisibility.hidden;
        largewall.inEditor = t;
        largewall.buildVisibility = t ? BuildVisibility.shown : BuildVisibility.hidden;
    });
    
    /*
    add("hackusated-mender", true, t => {
        mender.inEditor = t;
        mender.buildVisibility = t ? BuildVisibility.shown : BuildVisibility.hidden;
    });
    
    add("hackusated-overdrive", true, t => {
        od.inEditor = t;
        od.buildVisibility = t ? BuildVisibility.shown : BuildVisibility.hidden;
    });
    */
};
