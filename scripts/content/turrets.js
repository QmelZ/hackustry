// Generic turret stuff, i hope this doesn't break other blocks
//Vars.content.blocks().each(e => e.reloadTime = 0);
//Vars.content.blocks().each(e => e.spread = 0);
//Vars.content.blocks().each(e => e.inaccuracy = 0);
//Vars.content.blocks().each(e => e.recoilAmount = 0);
//Vars.content.blocks().each(e => e.shootShake = 0);
//Vars.content.blocks().each(e => e.restitution = 0);
//Vars.content.blocks().each(e => e.xRand = 0);
//Vars.content.blocks().each(e => e.cooldown = 10);
//Vars.content.blocks().each(e => e.rotatespeed = 2147483647);
//Vars.content.blocks().each(e => e.targetGround = true);
//Vars.content.blocks().each(e => e.targetAir = true);
//Vars.content.blocks().each(e => e.shootType.collidesGround = true);
//Vars.content.blocks().each(e => e.shootType.collidesAir = true);

//    if(typeof(e.shootType.collidesGround) !== "undefined") e.shootType.collidesGround = true;
//    if(typeof(e.shootType.collidesAir) !== "undefined") e.shootType.collidesAir = true;

Vars.content.blocks().each(e => {
    if(typeof(e.reloadTime) !== "undefined") e.reloadTime = 0;
    if(typeof(e.spread) !== "undefined") e.spread = 0;
    if(typeof(e.inaccuracy) !== "undefined") e.inaccuracy = 0;
    if(typeof(e.recoilAmount) !== "undefined") e.recoilAmount = 0;
    if(typeof(e.shootShake) !== "undefined") e.shootShake = 0;
    if(typeof(e.restitution) !== "undefined") e.restitution = 0;
    if(typeof(e.xRand) !== "undefined") e.xRand = 0;
    if(typeof(e.cooldown) !== "undefined") e.cooldown = 10;
    if(typeof(e.rotateSpeed) !== "undefined") e.rotateSpeed = 2147483647;
    if(typeof(e.targetGround) !== "undefined") e.targetGround = true;
    if(typeof(e.targetAir) !== "undefined") e.targetAir = true;
    if(typeof(e.shootType) !== "undefined") {
        if(typeof(e.shootType.collidesGround) !== "undefined") e.shootType.collidesGround = true;
        if(typeof(e.shootType.collidesAir) !== "undefined") e.shootType.collidesAir = true;
    }
});

// Lancerdown
Blocks.lancer.chargeTime = 144;
Blocks.lancer.chargeMaxDelay = 0;

// Meltlong
Blocks.meltdown.range = 999;
Blocks.meltdown.shootDuration = 999;
Blocks.meltdown.shootType.length = 999;
