export class RandomSkillTable {
  private rows: {[key: string]: any}[] = [];
  private rollToEntry: number[] = [];

  constructor(rows: {[key: string]: any}[]) {
    this.rows = rows;
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
      if (row.minRoll !== undefined && roll < row.minRoll) {
        addRow = false;
      }
      if (row.maxRoll !== undefined && roll > row.maxRoll) {
        addRow = false;
      }
      if (addRow) {
        result.push(row);
      }
    }
    return result;
  }
}
