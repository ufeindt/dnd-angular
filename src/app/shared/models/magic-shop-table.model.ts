import  magicShopData  from  '../data/magic-shop.json';

import { RandomSkillTable } from './random-skill-table.model';

export class MagicShopTable extends RandomSkillTable {
  constructor(magicShopTable = magicShopData[0]) {
    super(magicShopTable);
    this.ignoreMaxRoll = true;
  }

  setPreset(index: number, ignoreMaxRoll?: boolean, ignoreMinRoll?: boolean) {
    this.rows = magicShopData[index];
    if (ignoreMaxRoll !== undefined) {
      this.ignoreMaxRoll = ignoreMaxRoll;
    }
    if (ignoreMinRoll !== undefined) {
      this.ignoreMinRoll = ignoreMinRoll;
    }
  }
}
