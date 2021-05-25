package qmelz.hackustry.world.blocks.distribution;

import mindustry.gen.*;
import mindustry.world.blocks.defense.*;
import mindustry.world.meta.*;

class AntiDieWall extends Wall{
    def health = Integer.MAX_VALUE;
    def buildVisibility = BuildVisibility.hidden as BuildVisibility;
    def inEditor = false;
    
    AntiDieWall(String name){
        super(name);
    }
    
    class AntiDieBuild extends Wall.WallBuild{
        @Override
        void updateTile(){
            super.updateTile();
            this.health = this.maxHealth;
        }
    
        @Override
        boolean collision(Bullet bullet){
            return true;
        }
        
        void no(){
            this.dead = false;
            this.health = this.maxHealth;
        }
    
        @Override
        void kill(){
            this.no();
        }
    
        @Override
        void killed(){
            this.no();
        }
    
        @Override
        void remove(){
            this.no();
        }
    
        @Override
        void damage(float damage){
            this.no();
        }
    
        @Override
        void damage(float amount, boolean withEffect){
            this.no();
        }
    }
}
