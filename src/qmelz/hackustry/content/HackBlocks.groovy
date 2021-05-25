package qmelz.hackustry.content

import mindustry.ctype.ContentList
import mindustry.world.blocks.distribution.Conveyor
import mindustry.world.meta.BuildVisibility
import qmelz.hackustry.world.blocks.distribution.AntiDieWall


class HackBlocks implements ContentList{
    static def hackusatedConveyor, hackusatedWall, hackusatedWallLarge;
    
    void load(){
        hackusatedConveyor = new Conveyor("hackusated-conveyor"){{
            localizedName = "Hackusated Conveyor";
            description = "unit railgun";
            category = Category.distribution;
            buildVisibility = BuildVisibility.hidden as BuildVisibility;
            inEditor = false;
            health = 99999;
            speed = 99999;
            alwaysUnlocked = true;
        }}
        
        hackusatedWall = new AntiDieWall("hackusated-wall"){{
            size = 1;
        }}
    
        hackusatedWallLarge = new AntiDieWall("hackusated-wall-large"){{
            size = 2;
        }}
    }
}
