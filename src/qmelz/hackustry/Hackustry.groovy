package qmelz.hackustry

import mindustry.mod.Mod
import qmelz.hackustry.content.HackBlocks
import qmelz.hackustry.content.Features


class Hackustry extends Mod{
    def content = [
        new HackBlocks(),
        new Features()
    ];
    
    void loadContent(){
        content.each{it.load()}
    }
}