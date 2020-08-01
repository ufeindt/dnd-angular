import  magicItemData  from  '../data/magic-items.json';

export class MagicItemLookup {
  magicItems: {[key: string]: any} = {};

  constructor(magicItems = magicItemData) {
    this.magicItems = magicItems;
  }

  lookUpMagicItem(itemKey: string) {
    return JSON.parse(JSON.stringify(this.magicItems[itemKey]));
  }
}
