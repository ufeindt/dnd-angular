import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MagicItem } from './magic-item/magic-item.model';
import { MagicShopService } from './magic-shop.service';
import { RandomPrices } from '../shared/models/random-price-table.model';

@Component({
  selector: 'app-magic-shop',
  templateUrl: './magic-shop.component.html',
  styleUrls: ['./magic-shop.component.css']
})
export class MagicShopComponent implements OnInit {
  roll: number = 11;
  maxRoll: number = 41;
  selectedTableKey: string;

  magicItems: {[key: string]: MagicItem[]} = {}
  magicItemTableKeys: string[];
  rarities = ['common', 'uncommon', 'rare', 'very rare', 'legendary'];
  currentRarities: string[] = [];

  magicShopTableRows: {[key: string]: any}[];
  magicShopPreset: number = 0;
  magicShopPresetNames: string[] = [
    'Standard (XGtE p. 126)',
    'House Rules for Eberron'
  ];
  magicShopTablesIncludeLowerRolls: boolean = true;
  magicShopTableDisplay: {rollResultRange: string, instructions: string}[];

  randomPriceTableRows: RandomPrices;
  randomPriceTableDisplay: {rarity: string, instructions: string}[];


  constructor(private msService: MagicShopService) { }

  ngOnInit(): void {
    this.msService.offersChanged.subscribe(
      (magicItems: {[key: string]: MagicItem[]}) => {
        this.magicItems = magicItems;
        this.updateRarities();
      }
    );

    this.msService.presetChanged.subscribe(
      (presets: {
        magicShopTableRows: {[key: string]: any}[],
        randomPriceTableRows: RandomPrices}) => {
          this.magicShopTableRows = presets.magicShopTableRows;
          this.randomPriceTableRows = presets.randomPriceTableRows;
          this.updateMaxRoll();
          this.updateDisplayTables();
        }
    );

    this.magicItems = this.msService.getOffers();
    this.magicItemTableKeys = this.msService.getTableKeys();
    this.updateRarities();
    this.onChangeMagicShopTablePreset();
  }

  updateRarities() {
    this.currentRarities = [];
    for (let rarity of this.rarities) {
      if (this.magicItems[rarity]) {
        this.currentRarities.push(rarity);
      }
    }
  }

  updateMaxRoll() {
    this.maxRoll = 1;
    for (let i = 0; i < this.magicShopTableRows.length; i++) {
      if (this.magicShopTableRows[i].minRoll > this.maxRoll) {
        this.maxRoll = this.magicShopTableRows[i].minRoll;
      }
    }

    if (this.roll > this.maxRoll) {
      this.roll = this.maxRoll;
    }
  }

  updateDisplayTables() {
    this.updateMagicShopTableDisplay();
    this.updateRandomPriceTableDisplay();
  }

  updateMagicShopTableDisplay() {
    this.magicShopTableDisplay = [];
    for (let i = 0; i < this.magicShopTableRows.length; i++) {
      let row = this.magicShopTableRows[i];
      this.magicShopTableDisplay.push({
        rollResultRange: this.printRollResultRange(row),
        instructions: `Roll ${this.printDieRollInstruction(row)} times on ${row.tableKey}.`
      });
    }
  }

  updateRandomPriceTableDisplay() {
    this.randomPriceTableDisplay = [];
    for (let i = 0; i < this.rarities.length; i++) {
      let row = this.randomPriceTableRows[this.rarities[i]];
      this.randomPriceTableDisplay.push({
        rarity: this.rarities[i],
        instructions: `${this.printDieRollInstruction(row)} gp`
      });
    }
  }

  printDieRollInstruction(dieRollInstruction: {[key: string]: any}) {
    var out = `${dieRollInstruction.numDice}d${dieRollInstruction.numSides}`
    if (dieRollInstruction.modifier) {
      if (dieRollInstruction.modifier > 0) {
        out = `(${out} &plus; ${dieRollInstruction.modifier})`
      } else if (dieRollInstruction.modifier < 0) {
        out = `(${out} &minus; ${-dieRollInstruction.modifier})`
      }
    }
    if (dieRollInstruction.multiplier) {
      if (dieRollInstruction.multiplier != 0) {
        out = `${out} &times; ${dieRollInstruction.multiplier}`
      }
    }

    return out;
  }

  printRollResultRange(dieRollInstruction: {[key: string]: any}) {
    if (dieRollInstruction.minRoll && dieRollInstruction.maxRoll) {
      return `${dieRollInstruction.minRoll} &ndash; ${dieRollInstruction.maxRoll}`;
    } else if (dieRollInstruction.minRoll) {
      return `${dieRollInstruction.minRoll}&plus;`;
    } else if (dieRollInstruction.maxRoll) {
      return `${dieRollInstruction.maxRoll}&minus;`;
    }
  }

  onGenerateShop() {
    this.msService.generateNewMagicItems(this.roll);
  }

  onAddItem() {
    this.msService.addItem(this.selectedTableKey);
  }

  onSort() {
    this.msService.sortItems();
  }

  onClear() {
    this.msService.clearItems();
  }

  onChangeMagicShopTablePreset() {
    this.msService.setPreset(this.magicShopPreset, this.magicShopTablesIncludeLowerRolls);
  }
}
