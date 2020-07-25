
import  magicItemTableData  from  '../data/random-magic-items.json';
import  magicItemData  from  '../data/magic-items.json';
import  magicShopData  from  '../data/magic-shop.json';
import  spellData  from  '../data/spells.json';
import { MagicItem } from './magic-item/magic-item.model';
import { MagicShop } from './magic-shop.model'

export class MagicShopService {
  public magicItems: MagicItem[];
  private magicShop: MagicShop;

  constructor() {
    this.magicShop = new MagicShop(magicItemTableData, magicItemData, spellData, magicShopData);
    this.magicItems = this.magicItemTables.getRandomItemListByRoll(1);
  }

  getRandomItem(name: string) {
    return this.magicShop.getRandomItem(name);
  }

  getItemByRoll(name: string, i: number) {
    return this.magicShop.getItemByRoll(name, i);
  }

  getItemByIndex(name: string, i: number) {
    return this.magicShop.getItemByIndex(name, i);
  }
}
