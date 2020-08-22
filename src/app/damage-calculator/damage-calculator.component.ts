import { Component, OnInit, Input } from '@angular/core';

import { DamageCalculator } from './damage-calculator.model';
import { DamageCalculatorService } from './damage-calculator.service';

@Component({
  selector: 'app-damage-calculator',
  templateUrl: './damage-calculator.component.html',
  styleUrls: ['./damage-calculator.component.css']
})
export class DamageCalculatorComponent implements OnInit {
  damageCalculator: DamageCalculator;
  panelsExpanded: boolean[] = [];
  descriptions: string[] = [];
  statColors: string[] = ['#e41a1c', '#377eb8', '#4daf4a',
                          '#984ea3', '#ff7f00', '#ffff33',
                          '#a65628', '#f781bf', '#999999'];

  @Input() selectedPreset: number;
  presetNames: string[] = [
    'Level 4 Crossbow Rogue: Take Crossbow Expert or improve Dexterity?',
    'Level 9 Crossbow Rogue: When should I using Sharpshooter?',
    'Level 5 Ranger Sharpshooter',
    'Level 5 Reckless Barbarbian Great Weapon Master'
  ];
  presetDescriptions: string[][] = [
    [
      'Dual-wield Daggers (DEX +5, Proficiency +2)',
      'Single Rapier/Light Crossbow attack (DEX +5, Proficiency +2)',
      'Two Attacks with Hand Crossbow (DEX +4, Proficiency +2)'
    ],
    [
      'Two Hand Crossbow Attacks (DEX +5, Proficiency +4)',
      'Two Hand Crossbow Attacks using Sharpshooter (DEX +5, Proficiency +4)'
    ],
    [
      'Two Longbow Attacks (DEX +5, Proficiency +3)',
      'Two Longbow Attacks using Sharpshooter (DEX +5, Proficiency +3)',
      'Two Longbow Attacks with Advantage (DEX +5, Proficiency +3)',
      'Two Longbow Attacks using Sharpshooter with Advantage (DEX +5, Proficiency +3)'
    ],
    [
      'Two Reckless Greataxe Attacks (STR +5, Proficiency +3)',
      'Two Reckless Greatsword Attacks (STR +5, Proficiency +3)',
      'Two Reckless Greataxe Attacks using Great Weapon Master (STR +5, Proficiency +3)',
      'Two Reckless Greatsword Attacks using Great Weapon Master (STR +5, Proficiency +3)'
    ]
  ];

  constructor(private dcService: DamageCalculatorService) { }

  ngOnInit(): void {
    this.damageCalculator = this.dcService.getDamageCalculator();
    this.update();

    this.dcService.dcChanged.subscribe(
      (damageCalculator: DamageCalculator) => {
        this.damageCalculator = damageCalculator;
      }
    );

    this.dcService.indexRemoved.subscribe(
      (index: number) => {
        this.panelsExpanded.splice(index, 1);
        this.descriptions.splice(index, 1);
      }
    );

    this.dcService.descriptionChanged.subscribe(
      (change: {index: number, description: string}) => {
        this.descriptions[change.index] = change.description;
      }
    );

    this.dcService.attackRoundDuplicated.subscribe(
      (index: number) => {
        this.descriptions.push(this.descriptions[index]);
      }
    );
  }

  setPresetRound(index: number) {
    this.dcService.setPresetRounds(index);
    this.descriptions = this.presetDescriptions[index];
  }

  resetPanelsExpanded() {
    for (let i = 0; i < this.panelsExpanded.length; i++) {
      this.panelsExpanded[i] = false;
    }
  }

  update() {
    this.updatePanelsExpanded();
    this.updateDescriptionsLength();
  }

  updatePanelsExpanded () {
    while (this.panelsExpanded.length < this.damageCalculator.attackRounds.length) {
      this.panelsExpanded.push(false);
    }
  }

  updateDescriptionsLength () {
    while (this.descriptions.length < this.damageCalculator.attackRounds.length) {
      this.descriptions.push('');
    }
  }

  onPanelOpen(index: number) {
    this.panelsExpanded[index] = true;
  }

  onPanelClose(index: number) {
    this.panelsExpanded[index] = false;
  }

  onAddAttackRound() {
    this.dcService.addAttackRound();
  }

  onPresetSelection() {
    console.log(this.selectedPreset);
    this.setPresetRound(this.selectedPreset);
    this.dcService.sendUpdate(true);
    this.resetPanelsExpanded();
  }
}
