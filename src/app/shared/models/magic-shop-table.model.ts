import  magicShopData  from  '../data/magic-shop.json';

import { RandomSkillTable } from './random-skill-table.model';

export class MagicShopTable extends RandomSkillTable {
  constructor(magicShopTable = magicShopData) {
    super( magicShopTable);
  }

  // getRandomMagicItem(tableKey: string) {
  //   return this.magicItemTables[tableKey].getRandomEntry();
  // }

  // getMagicItemByRoll(tableKey: string, i: number) {
  //   return this.magicItemTables[tableKey].getEntryByRoll(i);
  // }

  // getMagicItemByIndex(tableKey: string, i: number) {
  //   return this.magicItemTables[tableKey].getEntryByIndex(i);
  // }

  // getTableKeys(exclude?: string) {
  //   var tableKeys: string[] = [];
  //   for (const name in this.magicItemTables) {
  //     if(exclude !== undefined && !name.includes(exclude)) {
  //       tableKeys.push(name);
  //     }
  //   }
  //   return tableKeys;
  // }
}
