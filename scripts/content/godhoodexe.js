Vars.content.units().each(u => u != UnitTypes.gamma ? u.weapons.each(w => !w.bullet.killShooter ? UnitTypes.gamma.weapons.add(w) : w) : u);
Vars.content.units().each(u => u != UnitTypes.gamma ? u.abilities.each(a => UnitTypes.gamma.abilities.add(a)) : u);
