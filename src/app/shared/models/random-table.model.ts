export class RandomTable {
  private rows: {[key: string]: any}[] = [];
  private rollToEntry: number[] = [];

  constructor(rows: {[key: string]: any}[]) {
    for (let i = 0; i < rows.length ; i++) {
      let row = rows[i];
      if (row.probability === undefined) {
        row.probability = 1;
      }
      for (let j = 0; j < row.probability ; j++) {
        this.rollToEntry.push(i);
      }
      delete row.probability;
      this.rows.push(row);
    }
  }

  getRandomEntry() {
    let i = Math.floor(Math.random() * this.rollToEntry.length);
    return this.rows[this.rollToEntry[i]];
  }

  getEntryByIndex(i: number) {
    return this.rows[i];
  }

  getEntryByRoll(i: number) {
    return this.rows[this.rollToEntry[i - 1]];
  }
}
