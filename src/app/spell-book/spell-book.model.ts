import { Spell } from './spell/spell.model'
import { SpellTables } from '../shared/models/spell-tables.model';

export class SpellBook {
  private spellTables: SpellTables = new SpellTables('Wizard');
  spells: {[level: number]: Spell[]} = {};

  constructor () {
  }

  getExcludeNames(spellLevel: number) {
    const excludeNames = [];
    if (this.spells[spellLevel] !== undefined) {
      for (let i = 0; i < this.spells[spellLevel].length; i++) {
        excludeNames.push(this.spells[spellLevel][i].name);
      }
    }
    return excludeNames;
  }

  getAvailableSpellNames(spellLevel: number) {
    var outSpells = [];
    var excludeNames = this.getExcludeNames(spellLevel);
    var tmpRows = this.spellTables.getFilteredRows(spellLevel, excludeNames);
    for (let i = 0; i < tmpRows.length; i++) {
      outSpells.push(new Spell(tmpRows[i]));
    }

    return outSpells;
  }

  getRandomSpell(spellLevel: number) {
    var excludeNames = this.getExcludeNames(spellLevel);
    const spell = this.spellTables.getRandomSpell(spellLevel, excludeNames);
    return new Spell(spell);
  }

  getSpellByIndex(spellLevel: number, i: number) {
    var excludeNames = this.getExcludeNames(spellLevel);
    const spell = this.spellTables.getSpellByIndex(spellLevel, i, excludeNames);
    return new Spell(spell);
  }

  addRandomSpell(spellLevel: number) {
    const spell = this.getRandomSpell(spellLevel);
    this.addSpell(spell);
  }

  addSpellByIndex(spellLevel: number, i: number) {
    const spell = this.getSpellByIndex(spellLevel, i);
    this.addSpell(spell);
  }

  addSpell(spell: Spell) {
    if (this.spells[spell.level] === undefined) {
      this.spells[spell.level] = [spell];
    } else {
      this.spells[spell.level].push(spell);
    }
  }

  removeSpell(level: number, index: number) {
    this.spells[level].splice(index, 1);
    if (this.spells[level].length === 0) {
      delete this.spells[level];
    }
  }

  rerollSpell(level: number, index: number) {
    this.spells[level][index] = this.getRandomSpell(level);
  }

  clearSpellList() {
    this.spells = {}
  }

  sortSpellList() {
    var compareSpellNames = function (s1: Spell, s2: Spell) {
      if (s2.name > s2.name) {
        return 1;
      }
      if (s1.name < s2.name) {
        return -1;
      }
      return 0;
    }

    for (const level in this.spells) {
      this.spells[level] = this.spells[level].sort(compareSpellNames);
    }
  }

  fillSpellList(wizardLevel: number) {
    if (wizardLevel <= 0 || wizardLevel > 20) {
      return;
    }
    for (let spellLevel = 1; spellLevel <= Math.min(Math.ceil(wizardLevel / 2), 9); spellLevel++) {
      var nSpells = 2;
      if (spellLevel == 1) {
        nSpells = 6;
      }
      if (spellLevel == 9 && wizardLevel > 18) {
        nSpells += 2 * (wizardLevel - 17);
      } else if (wizardLevel % 2 == 0 || spellLevel <= Math.floor(wizardLevel / 2)) {
        nSpells += 2
      }
      if (wizardLevel - 2 * spellLevel >= 0) {
        nSpells += Math.floor(Math.random() * 5);
      } else {
        nSpells += Math.floor(Math.random() * 3);
      }
      console.log(`Adding up to ${ nSpells } spells of level ${ spellLevel }.`);

      while (this.spells[spellLevel] === undefined || this.spells[spellLevel].length < nSpells){
        this.addRandomSpell(spellLevel);
      }
    }
    this.sortSpellList();
  }

  generateNewSpellList(wizardLevel: number) {
    this.clearSpellList();
    this.fillSpellList(wizardLevel);
  }
}
