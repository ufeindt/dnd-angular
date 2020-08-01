import  magicItemTableData  from  '../data/random-magic-items.json';

import { RandomTable } from './random-table.model';

export class MagicItemTables {
  magicItemTables: {[key: string]: RandomTable} = {};

  constructor(magicItemTables = magicItemTableData) {
    for (const name in magicItemTables) {
      const table = magicItemTables[name];
      this.magicItemTables[name] = new RandomTable(table);
    }
  }

  getRandomMagicItem(tableKey: string) {
    return this.magicItemTables[tableKey].getRandomEntry();
  }

  getMagicItemByRoll(tableKey: string, i: number) {
    return this.magicItemTables[tableKey].getEntryByRoll(i);
  }

  getMagicItemByIndex(tableKey: string, i: number) {
    return this.magicItemTables[tableKey].getEntryByIndex(i);
  }

  getTableKeys(exclude?: string) {
    var tableKeys: string[] = [];
    for (const name in this.magicItemTables) {
      if(exclude !== undefined && !name.includes(exclude)) {
        tableKeys.push(name);
      }
    }
    return tableKeys;
  }
}
