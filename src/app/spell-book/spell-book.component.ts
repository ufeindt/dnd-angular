import { Component, OnInit } from '@angular/core';

import { Spell } from './spell/spell.model';
import { SpellBookService } from './spell-book.service';

@Component({
  selector: 'app-spell-book',
  templateUrl: './spell-book.component.html',
  styleUrls: ['./spell-book.component.css']
})
export class SpellBookComponent implements OnInit {
  spellLevel: number = 3;
  wizardLevel: number = 5;
  selectedSpell: number = 0;

  spells: {[level: number]: Spell[]} = {};
  availableSpells: Spell[] = [];
  currentLevels: number[] = [];
  spellLevels: number[];
  wizardLevels: number[];
  showSpellLevel: number = 3;

  constructor(private sbService: SpellBookService) {
    this.spellLevels = [];
    for (let i = 1; i < 10; i++) {
      this.spellLevels.push(i);
    }

    this.wizardLevels = [];
    for (let i = 1; i < 21; i++) {
      this.wizardLevels.push(i);
    }
  }

  ngOnInit(): void {
    this.updateAvailableSpells();
    this.sbService.spellsChanged.subscribe(
      (spells: {[key: string]: Spell[]}) => {
        this.spells = spells;
        this.updateCurrentLevels();
        this.updateAvailableSpells();
      }
    );
  }

  updateCurrentLevels() {
    this.currentLevels = [];
    for (let level = 0; level < 10; level++) {
      if (this.spells[level]) {
        this.currentLevels.push(level);
      }
    }
  }

  updateAvailableSpells() {
    this.availableSpells = this.sbService.getAvailableSpells(this.showSpellLevel);
  }

  onGenerateSpellBook() {
    this.sbService.generateNewSpellList(this.wizardLevel);
  }

  onFillSpellBook() {
    this.sbService.fillSpellList(this.wizardLevel);
  }

  onSort() {
    this.sbService.sortSpellBook();
  }

  onClear() {
    this.sbService.clearSpellBook();
  }

  onAddRandomSpell() {
    this.sbService.addRandomSpell(this.spellLevel);
  }

  onAddSpell() {
    console.log(this.selectedSpell);
    this.sbService.addSpellByIndex(
      this.spellLevel,
      this.selectedSpell
    );
  }

  onSpellLevelSelect() {
    this.showSpellLevel = this.spellLevel;
    this.updateAvailableSpells()
  }
}
