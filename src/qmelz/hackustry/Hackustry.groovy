package qmelz.hackustry;

import mindustry.mod.*;
import qmelz.hackustry.content.*;
import qmelz.hackustry.core.*;


class Hackustry extends Mod{
    def content = [
        new HackBlocks(),
        new Features()
    ];
    
    void loadContent(){
        content.each{it.load()}
    }
}