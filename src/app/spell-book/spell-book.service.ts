import { EventEmitter } from '@angular/core';

import { Spell } from './spell/spell.model';
import { SpellBook } from './spell-book.model';

export class SpellBookService {
  private spellBook: SpellBook = new SpellBook();
  spellsChanged = new EventEmitter<SpellBook>();

  constructor() { }

  sendUpdate() {
    this.spellsChanged.emit(this.getSpellBook());
  }

  getSpellBook() {
    return JSON.parse(JSON.stringify(this.spellBook.spells));
  }

  getAvailableSpells(level) {
    return this.spellBook.getAvailableSpellNames(level);
  }

  generateNewSpellList(wizardLevel: number) {
    this.spellBook.generateNewSpellList(wizardLevel);
    this.sendUpdate();
  }

  fillSpellList(wizardLevel: number) {
    this.spellBook.fillSpellList(wizardLevel);
    this.sendUpdate();
  }

  clearSpellBook() {
    this.spellBook.clearSpellList();
    this.sendUpdate();
  }

  sortSpellBook() {
    this.spellBook.sortSpellList();
    this.sendUpdate();
  }

  addRandomSpell(level: number) {
    this.spellBook.addRandomSpell(level);
    this.sendUpdate();
  }

  addSpellByIndex(level: number, index: number) {
    this.spellBook.addSpellByIndex(level, index);
    this.sendUpdate();
  }

  removeSpell(level: number, index: number) {
    this.spellBook.removeSpell(level, index);
    this.sendUpdate();
  }

  rerollSpell(level: number, index: number) {
    this.spellBook.rerollSpell(level, index);
    this.sendUpdate();
  }
}
