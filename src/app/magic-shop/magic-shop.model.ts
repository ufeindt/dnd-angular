import { MagicItem } from './magic-item/magic-item.model';
import { MagicItemTables } from '../shared/models/magic-item-tables.model';
import { MagicItemLookup } from '../shared/models/magic-item-lookup.model';
import { MagicShopTable } from '../shared/models/magic-shop-table.model';
import { SpellTables } from '../shared/models/spell-tables.model';

export class MagicShop {
  private magicItemTables: MagicItemTables = new MagicItemTables();
  private magicItems: MagicItemLookup = new MagicItemLookup();
  private spellTables: SpellTables = new SpellTables();
  private magicShopTable: MagicShopTable = new MagicShopTable();
  private rarities: string[] = ['common', 'uncommon', 'rare', 'very rare', 'legendary'];
  offers: {[key: string]: MagicItem[]} = {};

  constructor() {
  }

  getRandomItem(tableKey: string) {
    var item = this.magicItemTables.getRandomMagicItem(tableKey);
    return this.processItem(item, tableKey);
  }

  getTableKeys() {
    return this.magicItemTables.getTableKeys('Aux');
  }

  addRandomItem(tableKey: string) {
    var item = this.getRandomItem(tableKey);
    this.addItem(item);
  }

  addItem(item: MagicItem) {
    if (this.offers[item.rarity] === undefined) {
      this.offers[item.rarity] = [item];
    } else {
      this.offers[item.rarity].push(item);
    }
  }

  removeItem(rarity: string, index: number) {
    this.offers[rarity].splice(index, 1);
    if (this.offers[rarity].length === 0) {
      delete this.offers[rarity];
    }
  }

  rerollItem(rarity: string, index: number) {
    let tableKey = this.offers[rarity][index].tableKey;
    this.offers[rarity][index] = this.getRandomItem(tableKey);
  }

  rerollProperties(rarity: string, index: number) {
    let originalItem = this.offers[rarity][index].originalItem;
    let tableKey = this.offers[rarity][index].tableKey;
    let price = this.offers[rarity][index].price;
    this.offers[rarity][index] = this.processItem(originalItem, tableKey, price);
  }

  rerollPrice(rarity: string, index: number) {
    let consumable = this.offers[rarity][index].consumable;
    let itemRarity = this.offers[rarity][index].rarity;
    this.offers[rarity][index].price = this.randomPrice(itemRarity, consumable);
  }

  clearOffers() {
    this.offers = {};
  }

    sortOffers() {
    var compareItemNames = function (mi1: MagicItem, mi2: MagicItem) {
      var mi1Name = mi1.name;
      var mi2Name = mi2.name;

      if (mi1.prefix !== undefined) {
        mi1Name = mi1.prefix + mi1Name;
      }
      if (mi1.suffix !== undefined) {
        mi1Name = mi1Name + mi1.suffix;
      }

      if (mi2.prefix !== undefined) {
        mi2Name = mi2.prefix + mi2Name;
      }
      if (mi2.suffix !== undefined) {
        mi2Name = mi1Name + mi2.suffix;
      }

      if (mi1Name > mi2Name) {
        return 1;
      }
      if (mi1Name < mi2Name) {
        return -1;
      }
      return 0;
    }

    // Check that rarities are correct
    for (const rarity in this.offers) {
      for (let i = this.offers[rarity].length - 1; i >= 0; i--) {
        var item = this.offers[rarity][i];
        if (item.rarity !== rarity) {
          this.addItem(item);
          this.removeItem(rarity, i);
        }
      }
    }

    for (const rarity in this.offers) {
      this.offers[rarity] = this.offers[rarity].sort(compareItemNames);
    }
  }

  generateNewOffers(roll: number) {
    this.clearOffers();
    var shopRows = this.magicShopTable.getEntriesByRoll(roll);
    for (let i = 0; i < shopRows.length; i++) {
      var row = shopRows[i];
      let n = this.rollDice(row.numDice, row.numSides);
      console.log(`Rolling ${ n } time(s) on ${ row.tableKey }`);
      for (let j = 0; j < n; j++) {
        this.addRandomItem(row.tableKey);
      }
    }
    this.sortOffers();
  }

  processItem(item: {[key: string]: any}, tableKey: string, price?: number) {
    switch(item.rowType) {
      case 'item': {
        var newItem = this.magicItems.lookUpMagicItem(item.itemKey);
        if (item.nameOverride !== undefined) {
          newItem.name = item.nameOverride;
        }
        if (item.prefix !== undefined && item.prefixLink === undefined) {
          newItem.name = item.prefix + newItem.name;
        } else if (item.prefix !== undefined && item.prefixLink !== undefined) { 
          newItem.prefix = item.prefix;
          newItem.prefixLink = item.prefixLink;
        }
        if (item.suffix !== undefined && item.suffixLink === undefined) {
          newItem.name = newItem.name + item.suffix;
        } else if (item.suffix !== undefined && !item.suffixLink !== undefined) {
          newItem.suffix = item.suffix;
          newItem.suffixLink = item.suffixLink;
        }
        if (price === undefined) {
          newItem.price = this.randomPrice(newItem.rarity, newItem.consumable);
        } else {
          newItem.price = price;
        }
        if (item.originalItem !== undefined) {
          newItem.originalItem = item.originalItem;
        }
        if (item.rerollType !== undefined) {
          newItem.rerollType = item.rerollType;
        }
        return new MagicItem(JSON.parse(JSON.stringify(newItem)), tableKey);
      }
      case 'table': {
        if (item['out'] === undefined) {
          item['out'] = {};
        }
        item.out.originalItem = JSON.parse(JSON.stringify(item));
        item.out.rerollType = item.rerollType;

        let newItem = this.magicItemTables.getRandomMagicItem(item.tableKey);
        for (const key in newItem) {
          item['out'][key] = newItem[key];
        }

        return this.processItem(item['out'], tableKey, price);
      }
      case 'spell': {
        item.out.originalItem = JSON.parse(JSON.stringify(item));
        item.out.rerollType = 'Spell';

        let spell = this.spellTables.getRandomSpell(item.spellLevel);
        item.out[item.spellNameKey] = spell.name;
        item.out[item.spellLinkKey] = spell.link;

        return this.processItem(item.out, tableKey, price);
      }
    }
  }

  rollDice(numDice: number, numSides: number) {
    var result: number = 0;
    for (let i = 0; i < numDice ; i++) {
      result += Math.floor(Math.random() * numSides + 1);
    }
    return result;
  }

  randomPrice(rarity: string, consumable: boolean) {
    var price: number = 0;
    switch(rarity) {
      case 'common': {
        price =  this.rollDice(2, 4) * 10;
        break;
      }
      case 'uncommon': {
        price = (this.rollDice(1, 6) + 3) * 100;
        break;
      }
      case 'rare': {
        price = (this.rollDice(3, 6) - 1) * 1000;
        break;
      }
      case 'very rare': {
        price = (this.rollDice(2, 4) + 1) * 10000;
        break;
      }
      case 'legendary': {
        price = (this.rollDice(2, 4) + 4) * 25000;
        break;
      }
    }
    if (consumable) {
      return price / 2;
    } else {
      return price;
    }
  }
}
