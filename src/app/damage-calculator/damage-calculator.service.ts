import { EventEmitter } from '@angular/core';

import { Attack } from './attack-round/attack/attack.model';
import { AttackRound } from './attack-round/attack-round.model';
import { DamageCalculator } from './damage-calculator.model';

export class DamageCalculatorService {
  private damageCalculator: DamageCalculator;
  dcChanged = new EventEmitter<DamageCalculator>();
  indexRemoved = new EventEmitter<number>();
  statsUpdated = new EventEmitter<[number, number][][]>();
  descriptionChanged = new EventEmitter<{index: number, description: string}>();
  attackRoundDuplicated = new EventEmitter<number>();

  constructor() {
    this.setPresetRounds();
  }

  getDamageCalculator() {
    return this.damageCalculator.copy();
  }

  sendUpdate(updatePage: boolean = false, removedIndex?: number) {
    this.damageCalculator.compileStats();
    this.statsUpdated.emit(this.damageCalculator.data.slice());
    if (updatePage) {
      this.dcChanged.emit(this.getDamageCalculator());
    }
    if (removedIndex) {
      this.indexRemoved.emit(removedIndex);
    }
  }

  updateAttackRound(indexAttackRound: number, attackRound: AttackRound) {
    this.damageCalculator.attackRounds[indexAttackRound] = attackRound;
    this.sendUpdate();
  }

  updateAttackNumber(indexAttack: number, indexAttackRound: number, attackNumber: number) {
    this.damageCalculator.attackRounds[indexAttackRound].attackNumbers[indexAttack] = attackNumber;
    this.damageCalculator.attackRounds[indexAttackRound].updateAttackIndexLookup();
    this.sendUpdate();
  }

  updateAttack(indexAttack: number, indexAttackRound: number, attack: Attack) {
    this.damageCalculator.attackRounds[indexAttackRound].attacks[indexAttack] = attack;
    this.damageCalculator.attackRounds[indexAttackRound].updateACRange();
    this.sendUpdate();
  }

  addAttackRound() {
    this.damageCalculator.addAttackRound();
    this.sendUpdate(true);
  }

  duplicateAttackRound(indexAttackRound: number) {
    this.damageCalculator.duplicateAttackRound(indexAttackRound);
    this.attackRoundDuplicated.emit(indexAttackRound);
    this.sendUpdate(true);
  }

  addAttack(indexAttackRound: number) {
    this.damageCalculator.addAttack(indexAttackRound);
    this.sendUpdate(true);
  }

  duplicateAttack(indexAttackRound: number, indexAttack: number) {
    this.damageCalculator.duplicateAttack(indexAttackRound, indexAttack);
    this.sendUpdate(true);
  }

  removeAttackRound(indexAttackRound: number) {
    this.damageCalculator.removeAttackRound(indexAttackRound);
    this.sendUpdate(true, indexAttackRound);
  }

  removeAttack(indexAttackRound: number, indexAttack: number) {
    this.damageCalculator.removeAttack(indexAttackRound, indexAttack)
    this.sendUpdate(true);
  }

  setPresetRounds(index: number = -1) {
    var attackRounds = [];
    switch(index) {
      case 0:
        let attackMain = new Attack(7, 5, {d4: 1});
        let attackOff = new Attack(7, 0, {d4: 1});
        let attackRapier = new Attack(7, 5, {d8: 1});
        let attackHandCrossbow = new Attack(6, 4, {d6: 1});
        attackRounds.push(new AttackRound([attackMain, attackOff], [1, 1], {}, {d6: 2}));
        attackRounds.push(new AttackRound([attackRapier], [1], {}, {d6: 2}));
        attackRounds.push(new AttackRound([attackHandCrossbow], [2], {}, {d6: 2}));
        break;
      case 1:
        let attackRegular = new Attack(9, 5, {d6: 1});
        let attackSharpshooter = new Attack(4, 15, {d6: 1});
        attackRounds.push(new AttackRound([attackRegular], [2], {}, {d6: 5}));
        attackRounds.push(new AttackRound([attackSharpshooter], [2], {}, {d6: 5}));
        break;
      case 2:
        let attackRegular2 = new Attack(10, 5, {d8: 1});
        let attackSharpshooter2 = new Attack(5, 15, {d8: 1});
        let attackRegular2Adv = new Attack(10, 5, {d8: 1}, true);
        let attackSharpshooter2Adv = new Attack(5, 15, {d8: 1}, true);
        attackRounds.push(new AttackRound([attackRegular2], [2], {d6: 1}, {}));
        attackRounds.push(new AttackRound([attackSharpshooter2], [2], {d6: 1}, {}));
        attackRounds.push(new AttackRound([attackRegular2Adv], [2], {d6: 1}, {}));
        attackRounds.push(new AttackRound([attackSharpshooter2Adv], [2], {d6: 1}, {}));
        break;
      case 3:
        let attackGreataxe = new Attack(8, 5, {d12: 1}, true);
        let attackGreatsword = new Attack(8, 5, {d6: 2}, true);
        let attackGreataxeGWM = new Attack(3, 15, {d12: 1}, true);
        let attackGreatswordGWM = new Attack(3, 15, {d6: 2}, true);
        attackRounds.push(new AttackRound([attackGreataxe], [2], {}, {}));
        attackRounds.push(new AttackRound([attackGreatsword], [2], {}, {}));
        attackRounds.push(new AttackRound([attackGreataxeGWM], [2], {}, {}));
        attackRounds.push(new AttackRound([attackGreatswordGWM], [2], {}, {}));
        break;
      default:
        this.damageCalculator = new DamageCalculator();
    }

    if (attackRounds.length > 0) {
      this.damageCalculator = new DamageCalculator(attackRounds);
    }
  }
}
