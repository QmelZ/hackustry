package qmelz.hackustry.types

import arc.*;
import groovy.transform.*;


@Canonical(excludes = "displayName")
class Feature{
    String name;
    String displayName;
    boolean toggleable;
    Closure function;
    
    {displayName = Core.bundle.get("hackustry.feature.$name")}
}
