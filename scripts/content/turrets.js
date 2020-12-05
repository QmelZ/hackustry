// Generic turret stuff
Vars.content.blocks().each(e => {
    if(e instanceof Turret) {
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
        if(typeof(e.shootType) !== "undefined") {
            if(typeof(e.shootType.collidesGround) !== "undefined") e.shootType.collidesGround = true;
            if(typeof(e.shootType.collidesAir) !== "undefined") e.shootType.collidesAir = true;
        }
    }
});

// Lancerdown
Blocks.lancer.chargeTime = 144;
Blocks.lancer.chargeMaxDelay = 0;

// Meltlong
Blocks.meltdown.range = 999;
Blocks.meltdown.shootDuration = 999;
Blocks.meltdown.shootType.length = 999;
