import spellData  from  '../data/spells.json';

import { RandomTable } from './random-table.model';

export class SpellTables {
  spells: RandomTable[] = [];

  constructor(spells = spellData) {
    for (let i = 0; i < 10; i++) {
      var tmpSpells = [];
      for (const name in spells) {
        var spell = spells[name];
        if (spell.level === i) {
          spell.probability = 1;
          tmpSpells.push(spell)
        }
      }
      this.spells.push(new RandomTable(tmpSpells));
    }
  }

  getRandomSpell(spellLevel: number) {
    return this.spells[spellLevel].getRandomEntry();
  }

  getSpellByRoll(spellLevel: number, i: number) {
    return this.spells[spellLevel].getEntryByRoll(i);
  }

  getSpellByIndex(spellLevel: number, i: number) {
    return this.spells[spellLevel].getEntryByIndex(i);
  }
}
