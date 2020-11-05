// Generic turret stuff
const isDef = (value) => typeof value !== "undefined";
const resets = [
  "reloadTime",
  "spread",
  "inaccuracy",
  "recoilAmount",
  "shootShake",
  "restitution",
  "xRand",
];
Vars.content.blocks.each((block) => {
  resets.forEach((reset) => {
    if (isDef(block[reset])) {
      block[reset] = 0;
    }
  });
  if (isDef(block.cooldown)) block.cooldown = 10;
  if (isDef(block.rotateSpeed)) block.rotateSpeed = 2147483647;
  if (isDef(block.targetGround)) block.targetGround = true;
  if (isDef(block.targetAir)) block.targetAir = true;
  if (isDef(block.shootType)) {
    if (isDef(block.shootType.collidesGround))
      block.shootType.collidesGround = true;
    if (isDef(block.shootType.collidesAir)) block.shootType.collidesAir = true;
  }
});

// Lancerdown
Blocks.lancer.chargeTime = 144;
Blocks.lancer.chargeMaxDelay = 0;

// Meltlong
Blocks.meltdown.range = 999;
Blocks.meltdown.shootDuration = 999;
Blocks.meltdown.shootType.length = 999;
