module.exports = (add) => {
    // visible all blocks
    add("build-visibility", false, () => {
        Vars.content.blocks().each(e => {
            if(e instanceof Floor) return;
            if(e instanceof Cliff) return;
            if(e instanceof Boulder) return;
            if(e instanceof TreeBlock) return;
            
            e.buildVisibility = BuildVisibility.shown;
        });
    });
    
    // reconstructors take no items and instant
    add("reconstructors", false, () => {
        Vars.content.blocks().each(e => {
            if(!(e instanceof Reconstructor)) return;
            e.constructTime = 0;
            e.consumes.items();
        });
    });
    
    // increase unit cap
    // this broke stuff when i tried to use integer limit in v3, so 99999 it is
    add("unit-cap", false, () => {
        Vars.content.blocks().each(e => {
            if(!(e instanceof CoreBlock)) return;
            e.unitCapModifier = 99999;
        });
    });
    
    // fixes the built in power source to give infinite power
    add("power-sources", true, t => {
        Blocks.powerSource.powerProduction = t ? Infinity : 1000000 / 60;
    });
    
    add("cursed-mode", true, t => {
        Vars.content.blocks().each(e => {
            if(e instanceof CoreBlock) return;
            
            if(t){
                if(e.size <= 2) return;
                e.size -= 2;
            }else{
                if(e.size > 14) return;
                e.size += 2;
            }
        });
    });
    
    add("op-turrets", false, () => {
        Blocks.scorch.name = "Scorch v5";
        Blocks.ripple.name = "Ripplag";
        Blocks.lancer.name = "Lancerdown";
        Blocks.meltdown.name = "Meltlong";
        Blocks.foreshadow.name = "Foreshadop";
        
        Vars.content.blocks().each(e => {
            if(e.minfo.mod) return;
            
            if(!(e instanceof Turret)) return;
            e.reloadTime = 0;
            e.spread = 0;
            e.inaccuracy = 0;
            e.recoilAmount = 0;
            e.restitution = 0;
            e.xRand = 0;
            e.cooldown = 10;
            e.rotateSpeed = 2147483647;
            e.targetGround = true;
            e.targetAir = true;
            
            if(!(e instanceof PowerTurret)) return;
            e.chargeTime = 144;
            e.chargeMaxDelay = 0;
            e.shootType.collidesGround = true;
            e.shootType.collidesAir = true;
            
            if(!(e instanceof LaserTurret)) return;
            e.range = 999;
            e.shootDuration = 999;
            e.shootType.length = 999;
        });
    });
};
