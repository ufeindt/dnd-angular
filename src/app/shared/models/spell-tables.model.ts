import spellData  from  '../data/spells.json';

import { RandomTable } from './random-table.model';

export class SpellTables {
  spells: RandomTable[] = [];
  playerClass: string;

  constructor(playerClass = 'any', spells = spellData) {
    this.playerClass = playerClass;

    for (let i = 0; i < 10; i++) {
      var tmpSpells = [];
      for (const name in spells) {
        var spell = spells[name];
        if (spell.level === i) {
          if (playerClass === 'any' || spell.class.includes(playerClass)){
            spell.probability = 1;
            tmpSpells.push(spell)
          }
        }
      }
      this.spells.push(new RandomTable(tmpSpells));
    }
  }

  getFilteredRows(spellLevel: number, excludeNames?: string[]) {
    var outRows = this.spells[spellLevel].getRows(excludeNames);
    return outRows;
  }

  getFilteredTable(spellLevel: number, excludeNames?: string[]) {
    var tmpRows = this.getFilteredRows(spellLevel, excludeNames);
    var outTable = new RandomTable(tmpRows);
    return outTable;
  }

  getRandomSpell(spellLevel: number, excludeNames?: string[]) {
    if (excludeNames === undefined) {
      return this.spells[spellLevel].getRandomEntry();
    } else {
      return this.getFilteredTable(spellLevel, excludeNames).getRandomEntry();
    }
  }

  getSpellByRoll(spellLevel: number, i: number, excludeNames?: string[]) {
    if (excludeNames === undefined) {
      return this.spells[spellLevel].getEntryByRoll(i);
    } else {
      return this.getFilteredTable(spellLevel, excludeNames).getEntryByRoll(i);
    }
  }

  getSpellByIndex(spellLevel: number, i: number, excludeNames?: string[]) {
    if (excludeNames === undefined) {
      return this.spells[spellLevel].getEntryByIndex(i);
    } else {
      return this.getFilteredTable(spellLevel, excludeNames).getEntryByIndex(i);
    }
  }
}
