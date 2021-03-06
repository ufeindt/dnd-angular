import { EventEmitter } from '@angular/core';

import { MagicItem } from './magic-item/magic-item.model';
import { MagicShop } from './magic-shop.model';
import { RandomPrices } from '../shared/models/random-price-table.model';

export class MagicShopService {
  private magicShop: MagicShop = new MagicShop();
  offersChanged = new EventEmitter<{[key: string]: MagicItem[]}>();
  presetChanged = new EventEmitter<{
    magicShopTableRows: {[key: string]: any}[],
    randomPriceTableRows: RandomPrices
  }>();

  constructor() {
  }

  sendUpdate() {
    this.offersChanged.emit(this.getOffers());
  }

  setPreset(index: number, ignoreMaxRoll: boolean) {
    this.magicShop.setPreset(index, ignoreMaxRoll);
    this.presetChanged.emit(this.magicShop.getCurrentPreset());
  }

  generateNewMagicItems(roll: number) {
    this.magicShop.generateNewOffers(roll);
    this.sendUpdate();
  }

  getOffers() {
    return JSON.parse(JSON.stringify(this.magicShop.offers));
  }

  getTableKeys() {
    return this.magicShop.getTableKeys();
  }

  addItem(tableKey: string) {
    this.magicShop.addRandomItem(tableKey);
    this.sendUpdate();
  }

  clearItems() {
    this.magicShop.clearOffers();
    this.sendUpdate();
  }

  removeItem(rarity: string, index: number) {
    this.magicShop.removeItem(rarity, index);
    this.sendUpdate();
  }

  rerollItem(rarity: string, index: number) {
    this.magicShop.rerollItem(rarity, index);
    this.sendUpdate();
  }

  rerollPrice(rarity: string, index: number) {
    this.magicShop.rerollPrice(rarity, index);
    this.sendUpdate();
  }

  rerollProperties(rarity: string, index: number) {
    this.magicShop.rerollProperties(rarity, index);
    this.sendUpdate();
  }

  sortItems() {
    this.magicShop.sortOffers();
    this.sendUpdate();
  }
}
