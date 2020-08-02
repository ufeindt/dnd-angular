import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Spell } from './spell/spell.model';
import { SpellBookService } from './spell-book.service';

@Component({
  selector: 'app-spell-book',
  templateUrl: './spell-book.component.html',
  styleUrls: ['./spell-book.component.css']
})
export class SpellBookComponent implements OnInit {
  @ViewChild('wizardLevelInput', {static: true}) wizardLevelInputRef: ElementRef;
  @ViewChild('spellLevelInput', {static: true}) spellLevelInputRef: ElementRef;
  @ViewChild('spellInput', {static: true}) spellInputRef: ElementRef;

  spells: {[level: number]: Spell[]} = {};
  availableSpells: Spell[] = [];
  currentLevels: number[] = [];
  spellLevels: number[];
  wizardLevels: number[];
  showSpellLevel: number = 1;

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
    this.sbService.generateNewSpellList(this.wizardLevelInputRef.nativeElement.value);
  }

  onFillSpellBook() {
    this.sbService.fillSpellList(this.wizardLevelInputRef.nativeElement.value);
  }

  onSort() {
    this.sbService.sortSpellBook();
  }

  onClear() {
    this.sbService.clearSpellBook();
  }

  onAddRandomSpell() {
    this.sbService.addRandomSpell(this.spellLevelInputRef.nativeElement.value);
  }

  onAddSpell() {
    this.sbService.addSpellByIndex(
      this.spellLevelInputRef.nativeElement.value,
      this.spellInputRef.nativeElement.value
    );
  }

  onSpellLevelSelect() {
    this.showSpellLevel = this.spellLevelInputRef.nativeElement.value;
    this.updateAvailableSpells()
  }
}
