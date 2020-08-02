import { Component, OnInit, Input } from '@angular/core';

import { Spell } from './spell.model';
import { SpellBookService } from '../spell-book.service';

@Component({
  selector: 'app-spell',
  templateUrl: './spell.component.html',
  styleUrls: ['./spell.component.css']
})
export class SpellComponent implements OnInit {
  @Input() spell: Spell;
  @Input() index: number;
  @Input() spellLevel: number;

  constructor(private sbService: SpellBookService) { }

  ngOnInit(): void {
  }

  onRemove() {
    this.sbService.removeSpell(this.spellLevel, this.index);
  }

  onReroll() {
    this.sbService.rerollSpell(this.spellLevel, this.index);
  }
}
