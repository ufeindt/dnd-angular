import { DamageDice } from './attack/damage-dice.model';
import { Attack } from './attack/attack.model';

export class AttackRound {
  attacks: Attack[];
  attackNumbers: number[];
  attackIndexLookup: number[] = [];
  bonusDice: DamageDice;
  oncePerTurnDice: DamageDice;
  acRange: number[];

  constructor (attacks: Attack[] = [],
               attackNumbers: number[] = [],
               bonusDice: DamageDice = {},
               oncePerTurnDice: DamageDice = {}) {
    this.attacks = attacks;
    this.attackNumbers = attackNumbers;
    this.bonusDice = bonusDice;
    this.oncePerTurnDice = oncePerTurnDice;

    this.update()
  }

  copy() {
    var attacks = [];
    for (let i = 0; i < this.attacks.length; i++) {
      attacks.push(this.attacks[i].copy());
    }
    return new AttackRound(
      attacks,
      this.attackNumbers.slice(),
      Object.assign({}, this.bonusDice),
      Object.assign({}, this.oncePerTurnDice)
    );
  }

  addAttack(attack?: Attack, attackNumber?: number) {
    if (attack) {
      this.attacks.push(attack);
      this.attackNumbers.push(attackNumber);
    } else {
      this.attacks.push(new Attack(6, 4, {d8: 1}));
      this.attackNumbers.push(1);
    }
    this.update();
  }

  duplicateAttack(index: number) {
    this.addAttack(this.attacks[index].copy(), this.attackNumbers[index]);
  }

  removeAttack(index) {
    this.attacks.splice(index, 1);
    this.attackNumbers.splice(index, 1);
    this.update();
  }

  update() {
    this.updateAttackIndexLookup();
    this.updateACRange();
  }

  updateAttackIndexLookup() {
    this.attackIndexLookup = [];
    for (let i = 0; i < this.attacks.length; i++) {
      for (let j = 0; j < this.attackNumbers[i]; j++) {
        this.attackIndexLookup.push(i);
      }
    }
  }

  updateACRange() {
    for (let i = 0; i < this.attacks.length; i++) {
      if (i === 0) {
        this.acRange = this.attacks[i].acRange.slice();
      } else {
        if (this.acRange[0] > this.attacks[i].acRange[0]) {
          this.acRange[0] = this.attacks[i].acRange[0];
        }
        if (this.acRange[1] < this.attacks[i].acRange[1]) {
          this.acRange[1] = this.attacks[i].acRange[1];
        }
      }
    }
  }

  getExpectedDamageByIndex(attackIndex, ac, bonusDice) {
    return this.attacks[this.attackIndexLookup[attackIndex]].getExpectedDamage(
      ac, bonusDice
    );
  }

  getHitProbabilitiesByIndex(attackIndex, ac) {
    return this.attacks[this.attackIndexLookup[attackIndex]].getHitProbabilities(ac);
  }

  getCombinedBonusDice(oncePerTurnAvailable: boolean = true) {
    let bDice: DamageDice = {};
    for (let i = 4; i <= 12; i += 2) {
      let diceKey = `d${ i }`;
      let nDice = (this.bonusDice[diceKey] || 0);
      if (oncePerTurnAvailable) {
        nDice += (this.oncePerTurnDice[diceKey] || 0) ;
      }
      if (nDice > 0) {
        bDice[diceKey] = nDice; 
      }
    }
    return bDice;
  }

  getFullDamage (ac: number, attackIndex: number = 0, oncePerTurnAvailable: boolean = true) {
    if (attackIndex === this.attackIndexLookup.length - 1) {
      return this.getExpectedDamageByIndex(
        attackIndex, ac, this.getCombinedBonusDice(oncePerTurnAvailable)
      );
    } else {
      let damage = this.getExpectedDamageByIndex(
        attackIndex, ac, this.getCombinedBonusDice(oncePerTurnAvailable)
      );
      if (oncePerTurnAvailable) {
        let probabilities = this.getHitProbabilitiesByIndex(attackIndex, ac);
        damage += (
          (probabilities.hit + probabilities.critical)
            * this.getFullDamage(ac, attackIndex + 1, false)
        );
        damage += (
          probabilities.miss * this.getFullDamage(ac, attackIndex + 1, true)
        );
      } else {
        damage += this.getFullDamage(ac, attackIndex + 1, oncePerTurnAvailable);
      }
      return damage;
    }
  }
}
