import { rollDice } from '../functions/roll-dice';

export interface PriceDice {
  numDice: number,
  numSides: number,
  modifier: number,
  multiplier: number
}

export interface RandomPrices {
  'common': PriceDice,
  'uncommon': PriceDice,
  'rare': PriceDice,
  'very rare': PriceDice,
  'legendary': PriceDice
}

export class RandomPriceTable {
  private randomPrices: RandomPrices;

  constructor (randomPrices?: RandomPrices) {
    if (randomPrices) {
      this.randomPrices = randomPrices;
    } else {
      this.setPreset(0);
    }
  }

  randomPrice(rarity: string, consumable: boolean) {
    var conf = this.randomPrices[rarity];
    var price = (rollDice(conf.numDice, conf.numSides) + conf.modifier) * conf.multiplier;
    if (consumable) {
      return price / 2;
    } else {
      return price;
    }
  }

  setPreset(index: number) {
    switch(index) {
      case 0:
        this.randomPrices = {
          'common': {numDice: 1, numSides: 6, modifier: 1, multiplier: 10},
          'uncommon': {numDice: 1, numSides: 6, modifier: 0, multiplier: 100},
          'rare': {numDice: 2, numSides: 10, modifier: 0, multiplier: 1000},
          'very rare': {numDice: 1, numSides: 4, modifier: 1, multiplier: 10000},
          'legendary': {numDice: 2, numSides: 6, modifier: 0, multiplier: 25000}
        };
        break;
      case 1:
        this.randomPrices = {
          'common': {numDice: 2, numSides: 4, modifier: 0, multiplier: 10},
          'uncommon': {numDice: 1, numSides: 6, modifier: 3, multiplier: 100},
          'rare': {numDice: 3, numSides: 6, modifier: -1, multiplier: 1000},
          'very rare': {numDice: 2, numSides: 4, modifier: 1, multiplier: 10000},
          'legendary': {numDice: 2, numSides: 4, modifier: 4, multiplier: 25000}
        };
        break;
      default:
        this.setPreset(0);
    }
  }

  getRows() {
    return this.randomPrices;
  }
}
