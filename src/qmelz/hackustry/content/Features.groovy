package qmelz.hackustry.content

import arc.Core
import mindustry.Vars
import mindustry.ctype.ContentList
import mindustry.entities.bullet.LaserBulletType
import mindustry.gen.Icon
import mindustry.ui.dialogs.PlanetDialog
import mindustry.world.blocks.defense.turrets.LaserTurret
import mindustry.world.blocks.defense.turrets.PowerTurret
import mindustry.world.blocks.defense.turrets.Turret
import mindustry.world.blocks.sandbox.PowerSource
import mindustry.world.blocks.storage.CoreBlock
import mindustry.world.blocks.units.Reconstructor
import mindustry.world.meta.BuildVisibility
import qmelz.hackustry.types.Feature
import qmelz.hackustry.ui.HackustryUI


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
    
    // feature management stuff
    
    static def features;
    
    static{
        features = this.declaredFields.findAll{!it.synthetic && it !== features}*.asType(Feature);
        
        features.each{
            Core.settings.defaults(it.internalName, true);
            
            if(get(it)) toggle(it);
        }
    }
    
    static def get(Feature f){
        return Core.settings.getBool(f.internalName);
    }
    
    static void toggle(Feature f){
        def nextState = !get(f);
        Core.settings.put(f.internalName, nextState);
        f.function.call(nextState);
        checkRestart(f);
    }
    
    static void checkRestart(Feature f){
        if(f.toggleable) return;
        HackustryUI.showToast(Icon.warning, Core.bundle.get("hackustry.toast.needs-restart"));
    }
}
