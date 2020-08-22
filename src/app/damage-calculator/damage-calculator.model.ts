import { Attack } from './attack-round/attack/attack.model';
import { AttackRound } from './attack-round/attack-round.model';

export class DamageCalculator {
  attackRounds: AttackRound[] = [];
  acRange: number[] = [0, 0];
  data: [number, number][][];

  constructor(attackRounds?: AttackRound[]) {
    if (attackRounds) {
      this.attackRounds = attackRounds;
    } else {
      this.attackRounds = [];
      this.addAttackRound();
    }
    this.compileStats();
  }

  copy() {
    var attackRounds = [];
    for (let i = 0; i < this.attackRounds.length; i++) {
      attackRounds.push(this.attackRounds[i].copy());
    }
    return new DamageCalculator(attackRounds);
  }

  addAttackRound(attackRound?: AttackRound) {
    if (attackRound) {
      this.attackRounds.push(attackRound);
    } else {
      this.attackRounds.push(new AttackRound());
      this.attackRounds[this.attackRounds.length - 1].addAttack();
    }
    this.update();
  }

  addAttack(indexAttackRound) {
    this.attackRounds[indexAttackRound].addAttack();
    this.update();
  }

  duplicateAttackRound(indexAttackRound) {
    this.addAttackRound(this.attackRounds[indexAttackRound].copy());
  }

  duplicateAttack(indexAttackRound, indexAttack) {
    this.attackRounds[indexAttackRound].duplicateAttack(indexAttack);
  }

  removeAttackRound(indexAttackRound) {
    this.attackRounds.splice(indexAttackRound, 1);
    this.update();
  }

  removeAttack(indexAttackRound, indexAttack) {
    this.attackRounds[indexAttackRound].removeAttack(indexAttack);
    this.update();
  }

  update() {
    this.updateAttackRounds();
    this.updateACRange();
  }

  updateAttackRounds() {
    for (let i = 0; i < this.attackRounds.length; i++) {
      this.attackRounds[i].update();
    }
  }

  updateACRange() {
    this.acRange = this.attackRounds[0].acRange.slice();
    for (let i = 1; i < this.attackRounds.length; i++) {
      if (this.acRange[0] > this.attackRounds[i].acRange[0]) {
        this.acRange[0] = this.attackRounds[i].acRange[0];
      }
      if (this.acRange[1] < this.attackRounds[i].acRange[1]) {
        this.acRange[1] = this.attackRounds[i].acRange[1];
      }
    }
  }

  compileStats() {
    this.update();

    this.data = [];
    for (let i = 0; i < this.attackRounds.length; i++) {
      this.data.push([]);
      for (let ac = this.acRange[0] - 2; ac < this.acRange[1] + 3; ac++) {
        this.data[i].push([ac, this.attackRounds[i].getFullDamage(ac)]);
      }
    }
  }
}
