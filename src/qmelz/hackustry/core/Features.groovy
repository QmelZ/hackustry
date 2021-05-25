package qmelz.hackustry.core;

import mindustry.*;
import mindustry.content.*;
import mindustry.ctype.*;
import mindustry.entities.bullet.*;
import mindustry.ui.dialogs.*;
import mindustry.world.blocks.defense.turrets.*;
import mindustry.world.blocks.sandbox.*;
import mindustry.world.blocks.storage.*;
import mindustry.world.blocks.units.*;
import mindustry.world.meta.*;
import qmelz.hackustry.content.*;
import qmelz.hackustry.types.*;


class Features implements ContentList{
    static def conveyor, walls, reconstructors, powerSources, cursedMode, opTurrets, launchAnywhere;
    
    void load(){
        conveyor = new Feature("hackusated-conveyor", true, {
            HackBlocks.hackusatedConveyor.buildVisibility = it ? BuildVisibility.shown : BuildVisibility.hidden;
            HackBlocks.hackusatedConveyor.inEditor = it;
        });
        
        walls = new Feature("hackusated-walls", true, {
            HackBlocks.hackusatedWall.buildVisibility = it ? BuildVisibility.shown : BuildVisibility.hidden;
            HackBlocks.hackusatedWall.inEditor = it;
            HackBlocks.hackusatedWallLarge.buildVisibility = it ? BuildVisibility.shown : BuildVisibility.hidden;
            HackBlocks.hackusatedWallLarge.inEditor = it;
        });
        
        reconstructors = new Feature("reconstructors", false, {
            Vars.content.blocks().each{
                if(!(it instanceof Reconstructor)) return;
                
                it.constructTime = 0;
                it.consumes.items();
            }
        });
        
        powerSources = new Feature("power-sources", true, {
            (Blocks.powerSource as PowerSource).powerProduction = it ? Float.POSITIVE_INFINITY : 1000000 / 60;
        });
        
        cursedMode = new Feature("cursed-mode", true, {
            Vars.content.blocks().each{e ->
                if(e instanceof CoreBlock) return;
                
                if(it){
                    if(e.size <= 2) return;
                    e.size -= 2;
                }else{
                    if(e.size > 14) return;
                    e.size += 2;
                }
            }
        });
        
        opTurrets = new Feature("op-turrets", false, {
            Blocks.scorch.localizedName = "Scorch v5";
            Blocks.ripple.localizedName = "Ripplag";
            Blocks.lancer.localizedName = "Lancerdown";
            Blocks.meltdown.localizedName = "Meltlong";
            Blocks.foreshadow.localizedName = "Foreshadop";
    
            Vars.content.blocks().each{
                if(it.minfo.mod) return;
        
                if(!(it instanceof Turret)) return;
                it.reloadTime = 0;
                it.spread = 0;
                it.inaccuracy = 0;
                it.recoilAmount = 0;
                it.restitution = 0;
                it.xRand = 0;
                it.cooldown = 10;
                it.rotateSpeed = 2147483647;
                it.targetGround = true;
                it.targetAir = true;
        
                if(!(it instanceof PowerTurret)) return;
                it.chargeTime = 144;
                it.chargeMaxDelay = 0;
                it.shootType.collidesGround = true;
                it.shootType.collidesAir = true;
        
                if(!(it instanceof LaserTurret)) return;
                it.range = 999;
                it.shootDuration = 999;
                (it.shootType as LaserBulletType).length = 999;
            }
        });
        
        launchAnywhere = new Feature("launch-anywhere", true, {
            PlanetDialog.debugSelect = it;
            Vars.content.sectors().each{e -> e.alwaysUnlocked = it}
        });
    }
}
