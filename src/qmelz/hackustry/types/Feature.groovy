package qmelz.hackustry.types

import arc.Core
import groovy.transform.Canonical


@Canonical(excludes = ["internalName", "displayName"])
class Feature{
    String name;
    String internalName;
    String displayName;
    boolean toggleable;
    Closure function;
    
    {
        this.internalName = "hackustry.feature.$name";
        this.displayName = Core.bundle.get(internalName);
    }
}
