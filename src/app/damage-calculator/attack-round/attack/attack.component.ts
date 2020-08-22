import { Component, OnInit, Input } from '@angular/core';

import { Attack } from './attack.model';
import { DamageCalculatorService } from '../../damage-calculator.service';

@Component({
  selector: 'app-attack',
  templateUrl: './attack.component.html',
  styleUrls: ['./attack.component.css']
})
export class AttackComponent implements OnInit {
  @Input() attack: Attack;
  @Input() numberAttacks: number;
  @Input() index: number;
  @Input() indexAttackRound: number;
  @Input() showRemoveButton: boolean;

  constructor(private dcService: DamageCalculatorService) { }

  ngOnInit(): void {
  }

  sendAttackUpdate() {
    this.dcService.updateAttack(this.index, this.indexAttackRound, this.attack.copy());
  }

  onChangeDice(nSides: number) {
    if (this.attack.damageDice[`d${nSides}`] <= 0) {
      delete this.attack.damageDice[`d${nSides}`];
    }
    this.sendAttackUpdate();
  }

  onChangeMod() {
    this.sendAttackUpdate();
  }

  onChangeNumberAttacks() {
    this.dcService.updateAttackNumber(this.index, this.indexAttackRound, this.numberAttacks);
  }

  onChangeAdvantage() {
    if (this.attack.advantage) {
      this.attack.disadvantage = false;
    }
    this.sendAttackUpdate();
  }

  onChangeDisadvantage() {
    if (this.attack.disadvantage) {
      this.attack.advantage = false;
    }
    this.sendAttackUpdate();
  }

  onChangeGWF() {
    this.sendAttackUpdate();
  }

  onDuplicateAttack() {
    this.dcService.duplicateAttack(this.indexAttackRound, this.index);
  }

  onRemoveAttack() {
    this.dcService.removeAttack(this.indexAttackRound, this.index);
  }
}
