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
    let i = Math.floor(Math.random() * this.rollToEntry.length + 1);
    return this.getEntryByRoll(i);
  }

  getEntryByRoll(i: number) {
    return this.getEntryByIndex(this.rollToEntry[i - 1]);
  }

  getEntryByIndex(i: number) {
    return JSON.parse(JSON.stringify(this.rows[i]));
  }

  getRows(excludeNames?: string[]) {
    var outRows: {[key: string]: any}[] = [];

    for (let i = 0; i < this.rows.length; i++) {
      if (!excludeNames.includes(this.rows[i].name)) {
        outRows.push(this.rows[i]);
      }
    }

    return outRows;
  }
}
