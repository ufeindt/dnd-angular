import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MagicItem } from './magic-item/magic-item.model';
import { MagicShopService } from './magic-shop.service';

@Component({
  selector: 'app-magic-shop',
  templateUrl: './magic-shop.component.html',
  styleUrls: ['./magic-shop.component.css']
})
export class MagicShopComponent implements OnInit {
  roll: number = 11;
  selectedTableKey: string;

  magicItems: {[key: string]: MagicItem[]} = {}
  magicItemTableKeys: string[];
  rarities = ['common', 'uncommon', 'rare', 'very rare', 'legendary'];
  currentRarities: string[] = [];

  constructor(private msService: MagicShopService) { }

  ngOnInit(): void {
    this.magicItems = this.msService.getOffers();
    this.magicItemTableKeys = this.msService.getTableKeys();
    this.updateRarities();

    this.msService.offersChanged.subscribe(
      (magicItems: {[key: string]: MagicItem[]}) => {
        this.magicItems = magicItems;
        this.updateRarities();
      }
    );
  }

  updateRarities() {
    this.currentRarities = [];
    for (let rarity of this.rarities) {
      if (this.magicItems[rarity]) {
        this.currentRarities.push(rarity);
      }
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
}
