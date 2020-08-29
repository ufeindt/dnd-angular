export class RandomSkillTable {
  public rows: {[key: string]: any}[] = [];
  private rollToEntry: number[] = [];
  public ignoreMaxRoll: boolean = false;
  public ignoreMinRoll: boolean = false;

  constructor(rows: {[key: string]: any}[], ignoreMaxRoll?: boolean, ignoreMinRoll?: boolean) {
    this.rows = rows;
    if (ignoreMaxRoll) {
      this.ignoreMaxRoll = ignoreMaxRoll;
    }
    if (ignoreMinRoll) {
      this.ignoreMinRoll = ignoreMinRoll;
    }
  }

  getRandomEntries(mod: number) {
    let roll: number = Math.floor(Math.random() * 20 + 1 + mod);
    return this.getEntriesByRoll(roll);
  }

  getEntriesByRoll(roll: number) {
    var result: {[key: string]: any}[] = [];
    for (let i = 0; i < this.rows.length; i++) {
      let row = this.rows[i];
      let addRow: boolean = true;
      if (row.minRoll !== undefined && roll < row.minRoll && !this.ignoreMinRoll) {
        addRow = false;
      }
      if (row.maxRoll !== undefined && roll > row.maxRoll && !this.ignoreMaxRoll) {
        addRow = false;
      }
      if (addRow) {
        result.push(row);
      }
    }
    return result;
  }

  getRows() {
    var out: {[key: string]: any}[] = [];
    for (let i = 0; i < this.rows.length; i++) {
      let row = Object.assign({}, this.rows[i]);
      if (row.minRoll !== undefined && this.ignoreMinRoll) {
        delete row.minRoll;
      }
      if (row.maxRoll !== undefined && this.ignoreMaxRoll) {
        delete row.maxRoll;
      }
      out.push(row);
    }

    return out;
  }
}
